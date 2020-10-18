import React, { useState } from 'react';
import './HowToUseCORABase.css';
import { Button, ButtonGroup, Card, Container, Row, Col } from 'react-bootstrap';

function HowToUseCORABase() {
    const [state, setState] = useState({
      yPosition: 25,
      title: "How to use CORAbase"
    });
    
    const styles = { 
      transform: `translateY(${state.yPosition}px)` 
    };

    var cardContents;
    if(state.title === "How to use CORAbase"){
      cardContents = (
        <div className="cardContents">
          Start by entering your ZIP code, address, or current location. Resources within 25 miles will be shown first, and you can 
          change the distance to show more or fewer locations.
        </div>
      );
    }else if(state.title === "Prevention"){
      cardContents = (
        <div className="cardContents">
          <p>There are 3 subgroups of prevention:</p>
          <ul>
            <li>Awareness and Education</li>
              <ul>
                <li>
                  According to CORA’s research, the general public is unable to correctly answer 60% of questions related to opioid use, which 
                  leads to frequent misuse. Filter by this tag to find programs dedicated to educating the everyday person.
                </li>
              </ul>
            <li>Physician Education</li>
              <ul>
                <li>
                  80% of opioid-use disorder cases originate with prescribed opioids for pain, and chronic pain management has been omitted 
                  from physician education. Filter by this tag to find educational resources for healthcare professionals.
                </li>
              </ul>
            <li>Political Advocacy</li>
              <ul>
                <li>
                  Developing policy geared towards reducing opioid-use disorders cases and overdose is crucial to curbing the opioid epidemic. 
                  Filter by this tag to find programs dedicated to advocating for this cause to all levels of government.
                </li>
              </ul>
          </ul>
        </div>
      );
    }else if(state.title === "Recovery"){
      cardContents = (
        <div className="cardContents">
          <ul>
            <li>Inpatient Rehabilitation</li>
              <ul>
                <li>
                  Getting sober on your own is not only dangerous during the initial detox, it is also more likely to result in a relapse later on. 
                  Inpatient rehab is a residential treatment center where patients reside for various lengths depending on their program. The average 
                  stay is 30 days, but most addiction treatment facilities offer longer programs. Filter by this tag to find inpatient rehabilitations 
                  centers
                </li>
              </ul>
            <li>Outpatient Rehabilitation</li>
              <ul>
                <li>
                  Outpatient rehab is an ideal option for people who are motivated to stop using their substance of choice, but require the 
                  flexibility of a program that will work around their schedules. Filter by this tag to find outpatient rehabilitations centers.
                </li>
                <li>Day Programs</li>
                  <ul>
                    <li>
                      Outpatient day programs have the highest level of care and structure provided within an outpatient setting. In a day program, 
                      clients typically commit to meeting 5-7 days per week at an outpatient facility for multiple hours each day.
                    </li>
                  </ul>
                <li>Intensive Outpatient Programs</li>
                  <ul>
                    <li>
                      Intensive outpatient programs establish a treatment plan with defined, measurable milestones in place to indicate progress. 
                      As these milestones are met, the time commitment required per week decreases.
                    </li>
                  </ul>
                <li>Continuing Care</li>
                  <ul>
                    <li>
                      Continuing care groups such as Narcotics Anonymous are ongoing support resources to help an individual solidify their commitment 
                      to sobriety. The groups are typically facilitated by a licensed therapist and meet weekly.
                    </li>
                  </ul>
              </ul>
            <li>Gender-Specific Treatment</li>
              <ul>
                <li>
                  Gender-specific addiction treatments are designed to specifically treat men and women separately. According to the 
                  National Survey on Drug Use and Health (NSDUH), there are fundamental biological and cultural differences between men and 
                  women in terms of substance abuse. Gender-specific treatment programs are sensitive to these differences and address the unique needs of 
                  each of the sexes in a comfortable and supportive environment. Filter by this tag to find gender-specific rehabilitations centers.
                </li>
                  <ul>
                    <li>Treatment for Men</li>
                    <li>Treatment for Women</li>
                    <li>Treatment for non-binary peoples</li>
                  </ul>
              </ul>
            <li>Intervention Specialists</li>
            <li>Nutrition Management</li>
              <ul>
                <li>
                  Nutrition management has been shown to significantly improve opioid-use disorder recovery rates. Filter by this tag to find 
                  treatment centers who offer their own nutrition services or resources that focus on nutrition management.
                </li>
              </ul>
            <li>Luxury Treatment</li>
              <ul>
                <li>
                  Resort-style rehabilitation centers are a luxury treatment option for addiction, where someone can receive a medically supervised detox, 
                  around the clock care, and an individualized care plan while enjoying top-tier comfort. These luxury drug and alcohol treatment centers 
                  generally cost much more than a standard treatment center. Filter by this tag to find luxury treatment centers.
                </li>
              </ul>
            <li>Faith-based Rehabilitation</li>
              <ul>
                <li>
                  Faith-based drug recovery centers and programs address a recovering addict's medical and spiritual needs. Filter by this tag 
                  to find faith-based rehabilitation centers.
                </li>
              </ul>
            <li>Support Groups</li>
              <ul>
                <li>
                  Support groups are offered as a space where individuals can come together to share their stories, experiences, and lives in a way that 
                  helps reduce isolation and loneliness. Most follow the 12-step recovery process, which you can learn about 
                  here: <a href="https://www.samhsa.gov/treatment-prevention-recovery/12-step-programs">https://www.samhsa.gov/treatment-prevention-recovery/12-step-programs</a>
                </li>
              </ul>
            <li>Recovery Residences</li>
              <ul>
                <li>
                  A “recovery residence” means a service that provides alcohol-free and illicit drug-free housing to individuals with substance-related 
                  disorders or addictive disorders or co-occurring mental health and substance-related disorders or addictive disorders.
                </li>
                  <ul>
                    <li>Level 1: Peer Run</li>
                    <li>Level 2: Monitored</li>
                    <li>Level 3: Supervised</li>
                    <li>Level 4: Service Provider</li>
                  </ul>
              </ul>
          </ul>
        </div>
      );
    }else if(state.title === "Harm Reduction"){
      cardContents = (
        <div className="cardContents">
          <p>
            Harm reduction is a set of strategies and ideas aimed at reducing negative consequences associated with drug use. This includes reducing blood-borne diseases and 
            fatalities from overdose.
          </p>
          <ul>
            <li>Overdose Response</li>
              <ul>
                <li>
                  Many state-approved programs are able to certify people to administer naloxone, a life-saving drug that reverses the effects of an overdose. Some of these 
                  programs are able to distribute naloxone themselves.
                </li>
                  <ul>
                    <li>Naloxone Distributor</li>
                    <li>Overdose Response Trainer</li>
                  </ul>
              </ul>
            <li>Needle Exchange Programs</li>
              <ul>
                <li>
                  Needle exchange programs—which are also known as syringe services programs or needle-syringe programs—provide new and sterile syringes to drug users. 
                  This is to reduce transmission of blood-borne diseases such as HIV and Hepatitis C.
                </li>
              </ul>
            <li>Needle Injection Sites</li>
            <li>Needle-Transmitted Diseases</li>
              <ul>
                <li>HIV Pre-Exposure Prophylaxis</li>
                <li>HIV Post-Exposure Prophylaxis</li>
                <li>Vaccine Clinics</li>
              </ul>
          </ul>
        </div>
      );
    }else if(state.title === "Transportation"){
      cardContents = (
        <div className="cardContents">
          <p>
            Transportation is available to those for whom transportation is a barrier to treatment, either by the resource itself or a separate organization. 
            Filter by this tag to find treatment centers who offer their own transportation services or resources that focus solely on transporting people to treatment locations.
          </p>
        </div>
      );
    }else if(state.title === "What is My Account?"){
      cardContents = (
        <div className="cardContents">
          Your account is your method of managing resources. You are able to bookmark, compare, suggest, and report resources. All we need is a username and 
          password to create an account. No personal information is required at all. We do not collect any information from you other than username, password, and bookmarked resources.
        </div>
      );
    }else if(state.title === "Bookmarks"){
      cardContents = (
        <div className="cardContents">
          You are able to bookmark resources by clicking on the bookmark button on the button right hand corner of each resource. This will add the resource to the “My Bookmarked Resources”. 
          You can also compare your bookmarked resources by going to this tab and checking the “Compare” box next to each resource.
        </div>
      );
    }else if(state.title === "Suggest a Resource"){
      cardContents = (
        <div className="cardContents">
          We understand that we may have missed resources while making the database. If you know of any resources in any of the categories, please suggest the resource through your account. 
          We will audit the submitted resources before adding them to the database.
        </div>
      );
    }else if(state.title === "Report a Resource"){
      cardContents = (
        <div className="cardContents">
          We understand that some of our information may potentially be slightly out-of-date. If you have any changes you’d like to suggest, please do so through the “Report A Resource” tab through your account. 
          We will audit the submitted suggestions before changing them in the database.
        </div>
      );
    }else if(state.title === "Printing your Resources"){
      cardContents = (
        <div className="cardContents">
          You are able to print resources by going to the “more details” page for every resource and pressing the “Print This Page Icon.”
        </div>
      );
    }else if(state.title === "Research Studies"){
      cardContents = (
        <div className="cardContents">
          CORA is actively engaged in opioid-related research that public services can use to improve their services. 
          Data from CORA’s research is published and made publically available. Participants of our studies are compensated or have a chance 
          at being compensated. If you would like to contribute to the public good and be compensated for it, please consider taking 10 minutes to 
          participate in a research study.
        </div>
      );
    }else if(state.title === "What is CORA?"){
      cardContents = (
        <div className="cardContents">
          CORA is a student-run nonprofit that aims to reduce disparities in opioid knowledge and resources. We were founded at the 
          University of Maryland, College Park and now have chapters across the nation. If you’d like to learn more, visit our website 
          at: <a href="https://coraumd.wixsite.com/cora">https://coraumd.wixsite.com/cora</a>
        </div>
      );
    }else {
      cardContents = (
        <div className="cardContents">
          Nothing Yet
        </div>
      );
    }
    
    return (
        <div className="faq">
          <Container fluid className="vh-100 d-flex flex-column">
          <Row className="h-100">
          <Col className="faqColumn">
          <div className="line faqButtons">
            <span style={styles} className="circle">
            </span>
            <ButtonGroup vertical>
              <Button className="titleButtons" onClick={() => setState({yPosition: 25, title: "How to use CORAbase"})}>How to use CORAbase</Button>

              <Button id="advanced-search" className="titleButtons" onClick={() => setState({yPosition: 80, title: "Advanced Search"})}>Advanced Search</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 115, title: "Prevention"})}>Prevention</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 150, title: "Recovery"})}>Recovery</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 185, title: "Mental Health Resources"})}>Mental Health Resources</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 220, title: "Harm Reduction"})}>Harm Reduction</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 255, title: "Transportation"})}>Transportation</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 290, title: "Pregnancy Support"})}>Pregnancy Support</Button>

              <Button id="my-account" className="titleButtons" onClick={() => setState({yPosition: 350, title: "What is My Account?"})}>What is My Account?</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 385, title: "Bookmarks"})}>Bookmarks</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 420, title: "Suggest a Resource"})}>Suggest a Resource</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 455, title: "Report a Resource"})}>Report a Resource</Button>

              <Button id="print-resources" className="titleButtons" onClick={() => setState({yPosition: 510, title: "Printing your Resources"})}>Printing your Resources</Button>
              <Button id="research-studies" className="titleButtons" onClick={() => setState({yPosition: 565, title: "Research Studies"})}>Research Studies</Button>
              <Button id="what-is-cora" className="titleButtons" onClick={() => setState({yPosition: 620, title: "What is CORA?"})}>What is CORA?</Button>
            </ButtonGroup>
          </div>
          </Col>
          <Col className="faqCardColumn">
            <div>
              <Card className="faqCard">
                <Card.Body className="d-flex align-items-start flex-column how-card">
                  <Card.Title className="p-2 faqTitle">{state.title}</Card.Title>
                  {cardContents}
                  <Button className="mt-auto p-2 resources-button">Fun link to more resources</Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
          </Row>
          </Container>
        </div>
    )
}

export default HowToUseCORABase;