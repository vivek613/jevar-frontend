import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
interface CardData {
  title: string;
  value: number;
  handleOpen?: any;
  showButton: boolean;
}
const CardDefault: React.FC<CardData> = ({
  title,
  value,
  handleOpen,
  showButton,
}) => {
  return (
    <Card className="mt-6 w-96">
      <CardBody className="flex  justify-center flex-col">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <div className="text-lg font-bold">{value}</div>
        {showButton && (
          <Button
            variant="filled"
            color="blue-gray"
            size="sm"
            fullWidth
            // className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 "
            className="flex items-center justify-center w-36  mt-3"
            onClick={handleOpen}
          >
            View Details
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default CardDefault;
