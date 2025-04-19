// import { useSidebar } from "@/components/ui/sidebar";
import RFlex from "@/components/RComponents/RFlex";
import RPagination from "@/components/RComponents/RPagination";
import RTable from "@/components/RComponents/RTable";
import { RPaginateTableProps } from "@/types/index.type";

const RPaginateTable = ({
  Records,
  emptyData,
  callBack,
  finishedOperation,
  setFinishedOperation,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  paginationContainerClassName,
  tableContainerClassName,
  paginationContentClassName,
  excelTitle,
  fetchFn
}: RPaginateTableProps) => {
  // const { open } = useSidebar();
  return (
    <RFlex
      className={`flex-col gap-2 xl:max-w-[1220px] max-md:max-w-[700px] 
        `}
    >
      <RTable
        Records={Records}
        loading={loading}
        finishedOperation={finishedOperation}
        setFinishedOperation={setFinishedOperation}
        callBack={callBack}
        emptyData={emptyData}
        tableContainerClassName={tableContainerClassName}
        excelTitle={excelTitle}
        fetchFn={fetchFn}
      />
      <RPagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
        paginationContainerClassName={paginationContainerClassName}
        paginationContentClassName={paginationContentClassName}
      />
    </RFlex>
  );
};

export default RPaginateTable;
