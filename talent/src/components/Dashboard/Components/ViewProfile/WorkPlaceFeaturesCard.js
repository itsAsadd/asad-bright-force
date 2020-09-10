import React from 'react';
import { Row, Card, Col, Typography, Input } from "antd";
import { useSelector } from "react-redux";


import './viewProfile.scss'

const { Paragraph, Title } = Typography
function WorkPlaceFeaturesCard() {

    const preferredRolesDescription = useSelector(state => state.auth.user && state.auth.user.preferredRoles && state.auth.user.preferredRoles.description);
    const userName = useSelector(state =>
        state.auth && state.auth.user && state.auth.user.name
    );
  
    const appConfigRoleFeatures = useSelector(state =>
        state.auth.appConfigs && state.auth.appConfigs["role-features"]
    );

    const appConfigCompanyValues = useSelector(state =>
        state.auth.appConfigs && state.auth.appConfigs["company-values"]
    );
    const appConfigCompanyFeatures = useSelector(state =>
        state.auth.appConfigs && state.auth.appConfigs["company-features"]
    );
    
    const workplaceFeatures = useSelector(state => state.auth.user && state.auth.user.workplaceFeatures);
    
    let namesArrayOfConfigs = []
    const convertConfigsIdToName = (ConfigsOptions, selectedConfigs) => {
        namesArrayOfConfigs = [];
        ConfigsOptions.filter(item => {
            selectedConfigs.filter(selectedItem => {
                if (selectedItem.feature && selectedItem.feature === item._id) {
                    return namesArrayOfConfigs.push(item.name)
                }
                if (selectedItem.value && selectedItem.value === item._id) {
                  return namesArrayOfConfigs.push(item.name)
              }
            })
        })
        return namesArrayOfConfigs;


    }

    return (
        <div>
            <Card style={{ margin: "8px 0px" }}>
                <Row justify='center'>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        {/* <Title level={2}>What is {userName} looking for next:</Title> */}
                        <Title level={2}>Workplace Features</Title>
                    </Col>
                </Row>
                <Row justify='center' >
                    <Col xs={24} sm={6} md={6} lg={6}>
                        <Paragraph className="font-weight-bold">What {userName} is looking for in this role</Paragraph>
                    </Col>
                    <Col xs={24} sm={18} md={18} lg={18}>
                    {preferredRolesDescription && preferredRolesDescription}
                    </Col>
                </Row>
                {/* <Row justify='center' >
                    <Col xs={24} sm={6} md={6} lg={6} >
                        <Paragraph className="font-weight-bold">Preferred Location:</Paragraph>

                    </Col>
                    <Col xs={24} sm={18} md={18} lg={18}>
                        {
                            cityPreference && appConfigCityPreference &&
                            convertConfigsIdToName(appConfigCityPreference, cityPreference).map((item, ind) => {
                                return <Paragraph key={ind}>{item}</Paragraph>

                            })
                        }
                    </Col>
                </Row> */}
                <Row justify='center' style={{textAlign:'center'}}>
                    <Col xs={20} sm={20} md={8} lg={8} className='mt-4'>
                        <Paragraph className="font-weight-bold">Role features</Paragraph>
                        <Row justify='center'>
                        {
                            appConfigRoleFeatures && workplaceFeatures && workplaceFeatures.roleFeatures &&
                            convertConfigsIdToName(appConfigRoleFeatures, workplaceFeatures.roleFeatures).map((item, ind) => {
                                return  <Col xs={20} sm={20} md={20} lg={20} key={ind}>
                                   <Input disabled value={item} className='ml-2 mt-2 text-dark'/>
                                </Col>

                            })
                        }
                        </Row>
                    </Col>
                <Col xs={20} sm={20} md={8} lg={8} className='mt-4'>
                    <Paragraph className="font-weight-bold">Company Values</Paragraph>

                    <Row justify='center'>
                        {
                            appConfigCompanyValues && workplaceFeatures && workplaceFeatures.companyValues &&
                            convertConfigsIdToName(appConfigCompanyValues, workplaceFeatures.companyValues).map((item, ind) => {
                                return  <Col xs={20} sm={20} md={20} lg={20} key={ind}>
                                   <Input disabled value={item} className='ml-2 mt-2 text-dark'/>
                                </Col>

                            })
                        }
                        </Row>

                </Col>
                <Col xs={20} sm={20} md={8} lg={8} className='mt-4'>
                    <Paragraph className="font-weight-bold">Company features</Paragraph>
                    <Row justify='center'>
                        {
                            appConfigCompanyFeatures && workplaceFeatures && workplaceFeatures.companyFeatures &&
                            convertConfigsIdToName(appConfigCompanyFeatures, workplaceFeatures.companyFeatures).map((item, ind) => {
                                return  <Col xs={20} sm={20} md={20} lg={20} key={ind}>
                                   <Input disabled value={item} className='ml-2 mt-2 text-dark'/>
                                </Col>

                            })
                        }
                        </Row>
                </Col>
                </Row>
            </Card>
        </div >
    )
}

export default WorkPlaceFeaturesCard;
