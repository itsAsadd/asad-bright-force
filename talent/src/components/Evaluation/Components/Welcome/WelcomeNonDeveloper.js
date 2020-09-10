import React, { useEffect, useState } from "react";
import { Typography, Button, Row, Col, Tag } from "antd";
import "../evaluation.scss";
import nonDeveloperPic from "../../../../assets/img/non-developer.png";
import { submitProfile } from '../../../../actions/talent'
import { useSelector, useDispatch } from "react-redux";
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

function WelcomeNonDeveloper() {
  const user = useSelector(state => state.auth.user);
  const appConfigs = useSelector(state => state.auth.appConfigs);
  const [mainRoleName, setMainRoleName] = useState('');
  const [secondaryRoleName, setSecondaryRoleName] = useState('');
  let roleOptions = appConfigs && appConfigs['preferred-role']
  const dispatch = useDispatch();
  const btnLoading = useSelector(state => state.auth.btnLoading);
  const [mainRoleSkills, setMainRoleSkills] = useState([]);
  const [secondaryRoleSkills, setSecondaryRoleSkills] = useState([]);
  const appConfigTechExp = useSelector(state =>
    state.auth.appConfigs && state.auth.appConfigs["skills"]
      ? state.auth.appConfigs["skills"]
      : null
  );
  useEffect(() => {
    roleOptions && roleOptions.filter(role => {
      if (user && user.preferredRoles && user.preferredRoles.secondaryRole) {
        if (role._id === user.preferredRoles.secondaryRole.name) {
          setSecondaryRoleName(role.name)
        }
      }
    })
    roleOptions && roleOptions.filter(role => {
      if (user && user.preferredRoles && user.preferredRoles.mainRole) {
        if (role._id === user.preferredRoles.mainRole.name) {
          setMainRoleName(role.name)
        }
      }
    })
  }, [appConfigs, roleOptions])


  useEffect(() => {

    // for main role skills
    let userSelectedMainSkills = [];
    if (user && user.preferredRoles && user.preferredRoles.mainRole && user.preferredRoles.mainRole.skills) {
      appConfigTechExp && appConfigTechExp.map(techExp => {
        user.preferredRoles.mainRole.skills.filter(skill => {
          if (skill === techExp._id) {
            let selectedObj = { experienceId: skill, experienceName: techExp.name }
            userSelectedMainSkills.push(selectedObj)
          }
        })
      })
    }
    setMainRoleSkills(userSelectedMainSkills)
    // for secondary roles skills
    let userSelectedSecondarySkills = [];
    if (user && user.preferredRoles && user.preferredRoles.secondaryRole && user.preferredRoles.secondaryRole.skills) {
      appConfigTechExp && appConfigTechExp.map(techExp => {
        user.preferredRoles.secondaryRole.skills.filter(skill => {
          if (skill === techExp._id) {
            let selectedObj = { experienceId: skill, experienceName: techExp.name }
            userSelectedSecondarySkills.push(selectedObj)
          }
        })
      })
    }
    setSecondaryRoleSkills(userSelectedSecondarySkills)
  }, [user, appConfigTechExp])
  const submitProfileData = () => {
    dispatch(submitProfile())
  }

  return (<>
    <Row>
      <Col xs={0} sm={0} md={5} lg={5} style={{ textAlign: 'center' }}>
        <img src={nonDeveloperPic} alt={'nonDeveloperPic'} />
      </Col>
      <Col xs={24} sm={24} md={16} lg={16}>
        <div className="evaluation-container">
          <div className="evaluation-title">
            <Title style={{ color: '#085394' }} level={2}>Welcome to Brightforce</Title>
          </div>

          <Paragraph>
            Before we start and send your profile for review by our talent manager,
            please make sure your role preferences are set up just right.
            we will present you to employers and send you relevant offers according to your role preferences.
            </Paragraph>
          <Paragraph>
            Your Process will consist of:
              <ul>
              <li>Profile review</li>
              <li>One-sided video interview</li>
            </ul>
          </Paragraph>
          <Paragraph>
            *After your profile is reviewed and approved you will get an invite to your one-sided video interview.
            </Paragraph>


          <Row>
            <Col xs={24} sm={24} md={11} lg={11}>
              <h4 style={{ color: '#085394' }} >Main Role</h4>
              <Paragraph>
                {mainRoleName} , {user && user.preferredRoles && user.preferredRoles.mainRole && user.preferredRoles.mainRole.yearsOfExperience} years of Experience
               &nbsp; &nbsp; <Link to='/talent/roles'><EditOutlined style={{ fontSize: '25px', fontWeight: 'bold' }} /></Link>
              </Paragraph>

              <h4>Skills</h4>
              <Paragraph>
                {mainRoleSkills.map((item, index) => (
                  <Tag key={index} style={{ margin: '0px 15px 5px 0px', padding: '3px 8px', fontSize: '16px' }}>
                    {item.experienceName}
                  </Tag>
                ))}
              </Paragraph>
            </Col>
            <Col xs={0} sm={0} md={1} lg={1} />
            <Col xs={24} sm={24} md={12} lg={12}>
              <h4 style={{ color: '#085394' }} >Secondary Role</h4>
              <Paragraph>
                {secondaryRoleName} , {user && user.preferredRoles && user.preferredRoles.secondaryRole && user.preferredRoles.secondaryRole.yearsOfExperience} years of Experience
              &nbsp; &nbsp; <Link to='/talent/roles'><EditOutlined style={{ fontSize: '25px', fontWeight: 'bold' }} /></Link>
              </Paragraph>
              <h4>Skills</h4>
              <Paragraph>
                {secondaryRoleSkills.map((item, index) => (
                  <Tag key={index} style={{ margin: '0px 15px 5px 0px', padding: '3px 8px', fontSize: '16px' }}>
                    {item.experienceName}
                  </Tag>
                ))}
              </Paragraph>
            </Col>
          </Row>

        </div>

      </Col>
      <Col xs={0} sm={0} md={2} lg={2}>

      </Col>
    </Row>
    <div className="my-4" style={{ textAlign: 'center' }}>
      <Button type="primary" loading={btnLoading} onClick={submitProfileData}>Send profile for review </Button>
    </div>
    <Paragraph className="my-4" style={{ textAlign: 'center' }}>
      *Note that after proceeding to the interview phase your roles may not be changed
            </Paragraph>
  </>
  );
}

export default WelcomeNonDeveloper;
