import { Button, Card, Col } from "antd";
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
    <Col span={8}>
      <Card title={title} bordered={true} className="min-h-[180px] mt-3">
        <span className="font-bold text-lg">{value}</span>
        {showButton && (
          <Button className="flex items-center mt-3" onClick={handleOpen}>
            View Details
          </Button>
        )}
      </Card>
    </Col>
  );
};

export default CardDefault;
