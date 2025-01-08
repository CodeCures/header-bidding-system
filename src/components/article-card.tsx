import {
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";


interface ArticleCardProps {
  img: string;
  title: string;
  desc: string;
}

export function ArticleCard({ img, title, desc }: ArticleCardProps) {
  return (
    <Card
      className="relative grid min-h-[30rem] items-end overflow-hidden rounded-xl"
      color="transparent" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
      <img
        width={768}
        height={768}
        src={img}
        alt="bg"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/60" />
      <CardBody className="relative flex flex-col justify-end" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Typography variant="h4" color="white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {title}
        </Typography>
        <Typography
          variant="paragraph"
          color="white"
          className="my-2 font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          {desc}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default ArticleCard;