import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PeriodDate = (props: {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (startDate: Date) => void;
  onEndDateChange: (startDate: Date) => void;
}) => {
  const startDateChangeHandler = (date: Date) => {
    props.onStartDateChange(date);
  };
  const endDateChangeHandler = (date: Date) => {
    props.onEndDateChange(date);
  };
  return (
    <>
      <span>시작일 :</span>
      <DatePicker
        selected={props.startDate}
        onChange={(date: Date) => startDateChangeHandler(date)}
      />
      <span>종료일 :</span>
      <DatePicker
        selected={props.endDate}
        onChange={(date: Date) => endDateChangeHandler(date)}
      />
    </>
  );
};

export default PeriodDate;
