import { Card, CardBody, Typography } from "@material-tailwind/react";
interface CardData {
  title: string;
  value: number;
}
const CardDefault: React.FC<CardData> = ({ title, value }) => {
  return (
    <Card className="mt-6 w-96">
      <CardBody className="flex  justify-center flex-col">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <div className="text-lg font-bold">{value}</div>
      </CardBody>
    </Card>
  );
};

export default CardDefault;
