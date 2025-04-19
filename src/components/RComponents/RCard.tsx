import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RCardProps } from "@/types/index.type";
const RCard = ({
  title,
  description,
  contentComponent,
  footerComponent,
  cardClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  contentClassName,
  footerClassName,
}: RCardProps) => {
  return (
    <Card id="card" className={cardClassName}>
      {title || description && (
        <CardHeader id="card header" className={headerClassName}>
          {title && <CardTitle className={titleClassName}>{title}</CardTitle>}
          {description && (
            <CardDescription className={descriptionClassName}>
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent id="card content" className={contentClassName}>
        {contentComponent}
      </CardContent>
      {footerComponent && (
        <CardFooter id="card footer" className={footerClassName}>
          {footerComponent}
        </CardFooter>
      )}
    </Card>
  );
};

export default RCard;
