import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import RButton from "@/components/RComponents/RButton";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { RPaginationProps } from "@/types/index.type";
import { useTranslation } from "react-i18next";

const RPagination: React.FC<RPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  paginationContainerClassName,
  paginationContentClassName,
}) => {
  const CreatePaginationItems = () => {
    const items = [];
    const leftRange = Math.max(currentPage - 1, 1);
    const rightRange = Math.min(currentPage + 1, totalPages);
    const { t } = useTranslation();

    // "Previous" button
    items.push(
      <PaginationItem key="prev">
        <RButton
          variant="ghost"
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          text={t("previous")}
          // Icon={ChevronLeft}
          disabled={currentPage === 1}
          className={`${currentPage === 1 ? "bg-[#F2F2F2] text-[#656565]" : ""}`}
        />
      </PaginationItem>
    );

    // First page and ellipsis if necessary
    if (leftRange > 1) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink
            onClick={() => onPageChange && onPageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (leftRange > 2) {
        items.push(
          <PaginationItem key="ellipsis-left">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Pages in range
    for (let page = leftRange; page <= rightRange; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            // href="#"
            onClick={() => onPageChange && onPageChange(page)}
            isActive={page === currentPage}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Last page and ellipsis if necessary
    if (rightRange < totalPages) {
      if (rightRange < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-right">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key="last">
          <PaginationLink
            // href="#"
            onClick={() => onPageChange && onPageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // "Next" button
    items.push(
      <PaginationItem key="next">
        <RButton
          variant="ghost"
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          text={t("next")}
          // Icon={ChevronRight}
          // iconRight
          disabled={currentPage === totalPages}
          className={`${currentPage === totalPages ? "bg-[#F2F2F2] text-[#656565]" : ""}`}

        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <Pagination className={paginationContainerClassName}>
      <PaginationContent className={paginationContentClassName}>
        {CreatePaginationItems()}
      </PaginationContent>
    </Pagination>
  );
};

export default React.memo(RPagination);
