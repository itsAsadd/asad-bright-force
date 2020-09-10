import React, { useEffect } from 'react';
import { Row, Col, Input, Button, InputNumber, Select, Form, notification } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { reSendOfferToTalent, getRecruitmentCandidatesList } from '../../../actions/positions'
// import OfferDetails from '../TalentPage/SidePanels/OfferSent';
import OfferDetails from '../TalentPage/SidePanels/OfferDetails';

const { TextArea } = Input;
const { Option } = Select;

function ResendOffer({
  companyPositionOffer,
  talentName
}) {

  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const selectedPositionRecruitment = useSelector(state => state.positions.selectedPositionRecruitment);
  const companyPositionDetails = useSelector(state => state.positions.companyPositionDetails);
  const appConfigs = useSelector(state => state.auth.appConfigs);
  const currencyOptions = appConfigs && appConfigs['currency']
  const positionOfferOptions = appConfigs && appConfigs['position-offer']
  const btnLoading = useSelector(state => state.company.btnLoading);


  useEffect(() => {
    form.setFieldsValue({
      salary: companyPositionDetails?.positionOffer?.salary ? companyPositionDetails?.positionOffer?.salary : '',
      currency: companyPositionDetails?.positionOffer?.currency ? companyPositionDetails?.positionOffer?.currency : '',
      signingBonus: companyPositionDetails?.positionOffer?.signingBonus ? companyPositionDetails?.positionOffer?.signingBonus : '',
      equity: companyPositionDetails?.positionOffer?.equity ? companyPositionDetails?.positionOffer?.equity : '',
      performanceBonus: companyPositionDetails?.positionOffer?.performanceBonus ? companyPositionDetails?.positionOffer?.performanceBonus : '',
    });

  }, [companyPositionDetails])


  const handleSubmit = (values) => {
    if (values.performanceBonus > 100 || values.performanceBonus < 0) {
      notification.error({
        message: 'Error',
        description: 'Performance Bonus value should between 0 and 100'
      });
    }
    else {
      let posRecId = selectedPositionRecruitment?._id
      dispatch(reSendOfferToTalent(values, posRecId)).then(() => {
        let positionId = selectedPositionRecruitment?.position
        if (companyPositionDetails?.groupsInfo?.length > 0) {
          let obj = {
            "groupId": companyPositionDetails?.groupsInfo?.[0]?._id,

          }
          dispatch(getRecruitmentCandidatesList(obj, positionId))
        }
        history.push('/company/hire/recruitment/details/' + positionId)
      })
    }

  }
  return (
    <>
      <Form
        form={form}
        onFinish={handleSubmit}
      >
        <div style={{ margin: '15px', textAlign: 'center', marginBottom: '25px', paddingBottom: '35px' }}>
          <h5>Offer Declined</h5>
          <b>{talentName} declined your offer</b>
          <p><b>Rejection Reason:</b> {companyPositionOffer?.candidateMessage}</p>
        </div>
        <OfferDetails />

        <div style={{ marginTop: '25px', textAlign: 'center', backgroundColor: "#6FA8DC", padding: 10 }}>
          <h4>Make Another Offer</h4>
        </div>
        <div style={{ margin: '15px', marginTop: '25px' }}>
          <div style={{ margin: '20px 0px' }}>
            <Row>
              <Col xs={10} sm={10} md={10} lg={10}>
                Salary
                      </Col>
              <Col xs={10} sm={10} md={10} lg={10}>
                <Form.Item name='salary' rules={
                  [
                    {
                      required: true,
                      message: "Please input Salary"
                    }
                  ]
                }>

                  <InputNumber style={{ width: '100%' }} type="number" />
                </Form.Item>

              </Col>
            </Row>


            <Row>
              <Col xs={10} sm={10} md={10} lg={10}>
                Currency
                      </Col>
              <Col xs={10} sm={10} md={10} lg={10}>
                <Form.Item name='currency' rules={
                  [
                    {
                      required: true,
                      message: "Please select Currency"
                    }
                  ]
                }>
                  <Select
                    showSearch
                    allowClear
                    placeholder="Select a Currency"
                    optionFilterProp="children"
                    style={{ width: 150 }}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {currencyOptions && currencyOptions.map((item, index) => {
                      return <Option key={index} value={item._id}>{item.name}</Option>
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col xs={10} sm={10} md={10} lg={10}>
                Equity
                      </Col>
              <Col xs={10} sm={10} md={10} lg={10}>
                <Form.Item name='equity' rules={
                  [
                    {
                      required: true,
                      message: "Please select Equity"
                    }
                  ]
                }>
                  <Select
                    showSearch
                    allowClear
                    placeholder="Select Equity"
                    optionFilterProp="children"
                    style={{ width: 150 }}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {positionOfferOptions && positionOfferOptions.map((item, index) => {
                      return <Option key={index} value={item._id}>{item.name}</Option>
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col xs={10} sm={10} md={10} lg={10}>
                Performance bonus (% out of 100)
                      </Col>
              <Col xs={10} sm={10} md={10} lg={10}>
                <Form.Item name='performanceBonus' rules={
                  [
                    {
                      required: true,
                      message: "Please select Performance Bonus"
                    }
                  ]
                }>
                  <InputNumber style={{ width: '100%' }} type="number" />
                </Form.Item>

              </Col>
            </Row>

            <Row>
              <Col xs={10} sm={10} md={10} lg={10}>
                Signing bonus
                      </Col>
              <Col xs={10} sm={10} md={10} lg={10}>
                <Form.Item name='signingBonus' rules={
                  [
                    {
                      required: true,
                      message: "Please select Sign Bonus"
                    }
                  ]
                }>
                  <Select
                    showSearch
                    allowClear
                    placeholder="Select a Bonus"
                    optionFilterProp="children"
                    style={{ width: 150 }}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {positionOfferOptions && positionOfferOptions.map((item, index) => {
                      return <Option key={index} value={item._id}>{item.name}</Option>
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>


          <Row style={{ marginBottom: '9px' }}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <h6>Letter to Candidate</h6>
              <Form.Item name='offerLetter'>
                <TextArea rows={8} />
              </Form.Item>

            </Col>
          </Row>

          <Row style={{ margin: '25px 0px' }}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Button
                type='primary'
                block
                htmlType="submit"
                loading={btnLoading}
              >
                Resend Request
					</Button>
            </Col>
          </Row>


        </div>
      </Form>
    </>
  )
}

export default ResendOffer;
