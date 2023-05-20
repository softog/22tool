import { DatePicker, Radio, InputNumber, Card } from 'antd';
import { Row, Col } from 'antd';

const { RangePicker } = DatePicker;

function App() {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <Row justify="center">
        <Col span={24} className="d-flex justify-content-center mt-2">
          <h5>日期时间计算</h5>
        </Col>

        <Col lg={8} mb={3}>
          <label htmlFor="startDate" className="form-label mb-1">开始日期</label>
          <div className="input-group">
            <RangePicker id="startDate" />
          </div>
        </Col>

        <Col lg={8} mb={2}>
          <label htmlFor="endDate" className="form-label mb-1">计算方式</label>
          <div className="input-group">
            <Radio.Group defaultValue={1} buttonStyle="solid">
              <Radio.Button value={1}>增加</Radio.Button>
              <Radio.Button value={2}>减少</Radio.Button>
            </Radio.Group>
          </div>
        </Col>

        <Col lg={8}>
          <Row>
            <Col span={12} className="pe-1">
              <div className="input-group mb-2">
                <span className="input-group-text">年</span>
                <InputNumber className="form-control" placeholder="0" />
              </div>
            </Col>

            <Col span={12} className="ps-1">
              <div className="input-group mb-2">
                <span className="input-group-text">月</span>
                <InputNumber className="form-control" placeholder="0" />
              </div>
            </Col>

            <Col span={12} className="pe-1">
              <div className="input-group mb-2">
                <span className="input-group-text">天</span>
                <InputNumber className="form-control" placeholder="0" />
              </div>
            </Col>

            <Col span={12} className="ps-1">
              <div className="input-group mb-2">
                <span className="input-group-text">时</span>
                <InputNumber className="form-control" placeholder="0" />
              </div>
            </Col>

            <Col span={12} className="pe-1">
              <div className="input-group mb-2">
                <span className="input-group-text">分</span>
                <InputNumber className="form-control" placeholder="0" />
              </div>
            </Col>

            <Col span={12} className="ps-1">
              <div className="input-group mb-2">
                <span className="input-group-text">秒</span>
                <InputNumber className="form-control" placeholder="0" />
              </div>
            </Col>
          </Row>

          <label className="form-label mb-1">计算结果</label>
          <Card>
            <div className="card-body">2023年05月14日 00:00:00</div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
