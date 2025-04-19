import RCard from "@/components/RComponents/RCard";
import styles from "./Flipping-Card.module.css";
import { RFlippingCardProps } from "@/types/index.type";
import { cn } from "@/lib/utils";
const RFlippingCard = ({
  frontTitle,
  frontDescription,
  frontContentComponent,
  frontContentClassName,
  frontHeaderClassName,
  frontTitleClassName,
  frontDescriptionClassName,
  frontCardClassName,
  frontFooterClassName,
  frontFooterComponent,
  backTitle,
  backDescription,
  backContentComponent,
  backContentClassName,
  backHeaderClassName,
  backTitleClassName,
  backDescriptionClassName,
  backCardClassName,
  backFooterClassName,
  backFooterComponent,
  flipCardClassName = "h-[275px] w-[24%]"
}: RFlippingCardProps) => {
  return (
    <div className={cn(flipCardClassName, styles.flipCard)}>
      <div className={`${styles.flipCardInner}`}>
        <RCard
          cardClassName={cn(styles.flipCardFront, frontCardClassName)}
          contentComponent={frontContentComponent}
          contentClassName={frontContentClassName}
          description={frontDescription}
          descriptionClassName={frontDescriptionClassName}
          footerClassName={frontFooterClassName}
          footerComponent={frontFooterComponent}
          headerClassName={frontHeaderClassName}
          title={frontTitle}
          titleClassName={frontTitleClassName}
        />
        <RCard
          cardClassName={cn(styles.flipCardBack, backCardClassName)}
          contentComponent={backContentComponent}
          contentClassName={backContentClassName}
          description={backDescription}
          descriptionClassName={backDescriptionClassName}
          footerClassName={backFooterClassName}
          footerComponent={backFooterComponent}
          headerClassName={backHeaderClassName}
          title={backTitle}
          titleClassName={backTitleClassName}
        />
      </div>
    </div>
  );
};

export default RFlippingCard;
