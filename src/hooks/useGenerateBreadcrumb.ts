import { BreadCrumbObject } from "@/types/index.type";
import { usePathname, useSearchParams } from "next/navigation";

export const useGenerateBreadcrumb = (
    pathParams: any
): BreadCrumbObject[] => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pathNameArray = pathname.slice(1).split("/");
    const queryObject: { [key: string]: string } = {};

    searchParams.forEach((value, key) => {
        queryObject[key] = value;
    });

    const remainingPathParams = { ...pathParams };

    const breadcrumbObjects = pathNameArray.map((pathSegment: string, index: number) => {
        const path = "/" + pathNameArray.slice(0, index + 1).join("/");

        const { key } = checkIfThePathnameIsParam(pathSegment, remainingPathParams);

        const title = key ? (queryObject[key] ?? pathSegment) : pathSegment;

        if (key) delete remainingPathParams[key];

        return { title, path };
    });

    return breadcrumbObjects;
};

const checkIfThePathnameIsParam = (pathSegment: string, pathParams: any) => {
    const entries = Object.entries(pathParams);
    const index = entries.findIndex(([, value]) => value === pathSegment);
    const key = entries[index]?.[0];
    return { key, queryIndex: index };
};
