import { useState } from 'react';
import { DatePicker, Radio, InputNumber, Card } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

function DateTimeCalculator() {
  const [startDate, setStartDate] = useState(null);
  const [mode, setMode] = useState(1);
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const calculateDateTime = () => {
    let result = startDate ? moment(startDate) : moment();

    if (mode === 1) {
      result = result
        .add(years, 'years')
        .add(months, 'months')
        .add(days, 'days')
        .add(hours, 'hours')
        .add(minutes, 'minutes')
        .add(seconds, 'seconds');
    } else {
      result = result
        .subtract(years, 'years')
        .subtract(months, 'months')
        .subtract(days, 'days')
        .subtract(hours, 'hours')
        .subtract(minutes, 'minutes')
        .subtract(seconds, 'seconds');
    }

    return result.format('YYYY年MM月DD日 HH:mm:ss');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 d-flex justify-content-center mt-2">
        <h5>日期时间计算</h5>
      </div>

      <div className="col-lg-8 mb-3">
        <label htmlFor="startDate" className="form-label mb-1">开始日期</label>
        <div className="input-group">
          <DatePicker
            id="startDate"
            value={startDate}
            onChange={handleDateChange}
            className="form-control bg-transparent"
            showTime
            format="YYYY年MM月DD日 HH:mm:ss"
          />
        </div>
      </div>

      <div className="col-lg-8 mb-2">
        <label htmlFor="mode" className="form-label mb-1">计算方式</label>
        <div className="input-group">
          <Radio.Group id="mode" onChange={handleModeChange} value={mode}>
            <Radio value={1}>增加</Radio>
            <Radio value={2}>减少</Radio>
          </Radio.Group>
        </div>
      </div>

      <div className="col-lg-8">
        <div className="row">
          <div className="col-6 pe-1">
            <div className="input-group mb-2">
              <span className="input-group-text">年</span>
              <InputNumber
                value={years}
                onChange={(value) => setYears(value)}
                className="form-control"
                placeholder="0"
              />
            </div>
          </div>
          <div className="col-6 pe-1">
            <div className="input-group mb-2">
              <span className="input-group-text">年</span>
              <InputNumber
                value={years}
                onChange={(value) => setYears(value)}
                className="form-control"
                placeholder="0"
              />
            </div>
          </div>

          <div className="col-6 ps-1">
            <div className="input-group mb-2">
              <span className="input-group-text">月</span>
              <InputNumber
                value={months}
                onChange={(value) => setMonths(value)}
                className="form-control"
                placeholder="0"
              />
            </div>
          </div>

          <div className="col-6 pe-1">
            <div className="input-group mb-2">
              <span className="input-group-text">天</span>
              <InputNumber
                value={days}
                onChange={(value) => setDays(value)}
                className="form-control"
                placeholder="0"
              />
            </div>
          </div>

          <div className="col-6 ps-1">
            <div className="input-group mb-2">
              <span className="input-group-text">时</span>
              <InputNumber
                value={hours}
                onChange={(value) => setHours(value)}
                className="form-control"
                placeholder="0"
              />
            </div>
          </div>

          <div className="col-6 pe-1">
            <div className="input-group mb-2">
              <span className="input-group-text">分</span>
              <InputNumber
                value={minutes}
                onChange={(value) => setMinutes(value)}
                className="form-control"
                placeholder="0"
              />
            </div>
          </div>

          <div className="col-6 ps-1">
            <div className="input-group mb-2">
              <span className="input-group-text">秒</span>
              <InputNumber
                value={seconds}
                onChange={(value) => setSeconds(value)}
                className="form-control"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <label className="form-label mb-1">计算结果</label>
        <Card>
          <div className="card-body" id="answer">
            {calculateDateTime()}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DateTimeCalculator;
