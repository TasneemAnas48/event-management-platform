import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGenerateBreadcrumb } from "@/hooks/useGenerateBreadcrumb";
import Link from "next/link";

const RBreadcrumb = () => {
    const breadcrumbObjects = useGenerateBreadcrumb({});
    const disabledKeyword: string[] = [];

    const formatTitle = (title: string) => {
        return decodeURIComponent(title)
            .replace(/-/g, " ")
            .replace(/&amp;/g, "&")
            .replace(/&#38;/g, "&")
            .replace(/\+/g, " ");
    };

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbObjects.map((breadcrumbItem: any, index: number) =>
                    index != breadcrumbObjects.length - 1 ? (
                        <>
                            <BreadcrumbItem key={breadcrumbItem.title} className="hidden md:block text-foreground capitalize">
                                {disabledKeyword.includes(breadcrumbItem.title) ?
                                    <span>
                                        {formatTitle(breadcrumbItem.title)}
                                    </span> :
                                    <Link href={breadcrumbItem.path}>{formatTitle(breadcrumbItem.title)}</Link>
                                }
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                        </>
                    ) : (
                        <BreadcrumbItem>
                            {breadcrumbItem.title != "undefined" &&
                                <BreadcrumbPage className="!text-muted-foreground capitalize">
                                    {formatTitle(breadcrumbItem.title)}
                                </BreadcrumbPage>
                            }
                        </BreadcrumbItem>
                    )
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default RBreadcrumb;