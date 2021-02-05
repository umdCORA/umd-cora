import React, { useState, useEffect } from 'react';
import './HowToUseCORABase.css';
import { Button, ButtonGroup, Card, Container, Form, Row, Col } from 'react-bootstrap';

function HowToUseCORABase() {
    const [state, setState] = useState({
      yPosition: 25,
      title: "How to use CORAbase",
      windoWidth: window.innerWidth,
    });
    const [width, setWidth] = React.useState(window.innerWidth);
    const styles = {
      transform: `translateY(${state.yPosition}px)`
    };

    // when left panel is hidden remove left and right padding on faq card
    const faqCardStyles = {
      paddingLeft: '20px',
      paddingRight: '20px'
    }

    const updateWidth = () =>  setWidth(window.innerWidth);

    useEffect(() => {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    });

    const handleFAQDropdownChange = event => setState({title: event.target.value})

    var cardContents;
    if(state.title === "How to use CORAbase"){
      cardContents = (
        <>
        <div className="cardContents">
          <p>
            Start by entering your ZIP code, address, or current location.
            Resources within 25 miles will be shown first,
            and you can change the distance to show more or fewer locations.
          </p>
        </div>
        <Button href="/" className="mt-auto p-2 resources-button">Get Started!</Button>
        </>
      );
    }else if(state.title === "Advanced Search"){
      cardContents = (
        <>
        <div className="cardContents">
          <p>
            Often, users may require more specific resources for their situation.
            These users can use the advanced search function to look for resources under specific categories,
            such as treatment, harm reduction, or mental health resources.
            Each category is further defined below.
          </p>
        </div>
        <Button href="https://www.psychiatry.org/patients-families/addiction/opioid-use-disorder/opioid-use-disorder" className="mt-auto p-2 resources-button">More on Opioid Addiction</Button>
        </>
      );
    }else if(state.title === "Prevention"){
      cardContents = (
        <div className="cardContents">
          <p>
            There are 3 subgroups of prevention:
          </p>
          <ul>
            <li>Awareness and Education</li>
              <ul>
                <li>
                  According to CORA’s research, the general public is unable to correctly answer 60% of 
                  questions related to opioid use, which leads to frequent misuse. Filter by this tag to 
                  find programs dedicated to educating the everyday person.
                </li>
              </ul>
            <li>Physician Education</li>
              <ul>
                <li>
                  80% of opioid-use disorder cases originate with prescribed opioids for pain, and chronic 
                  pain management has been omitted from physician education. Filter by this tag to find 
                  educational resources for healthcare professionals.
                </li>
              </ul>
            <li>Political Advocacy</li>
              <ul>
                <li>
                  Developing policy geared towards reducing opioid-use disorders cases and overdose is 
                  crucial to curbing the opioid epidemic. Filter by this tag to find programs dedicated 
                  to advocating for this cause to all levels of government.
                </li>
              </ul>
          </ul>
        </div>
      );
    }else if(state.title === "Recovery"){
      cardContents = (
        <>
        <div className="cardContents">
          <ul>
            <li>Medicated Assisted Treatment</li>
              <ul>
                <li>
                  Medication-assisted treatment (MAT) is
                  the use of medications in combination with counseling and behavioral therapies,
                  which is effective in the treatment of opioid use disorders (OUD)
                  and can help some people to sustain recovery.
                  Filter by this tag to find locations offering MAT services.
                </li>
              </ul>
            <li>Inpatient Rehabilitation</li>
              <ul>
                <li>
                  Getting sober on your own is not only dangerous during the initial detox,
                  but is also more likely to result in a relapse later on.
                  Inpatient rehab is a residential treatment center
                  where patients reside for various lengths depending on their program.
                  The average stay is 30 days, but most addiction treatment facilities offer longer programs.
                  Filter by this tag to find inpatient rehabilitation centers.
                </li>
              </ul>
            <li>Outpatient Rehabilitation</li>
              <ul>
                <li>
                  Outpatient rehab is an ideal option
                  for people who are motivated to stop using their substance of choice,
                  but require the flexibility of a program that will work around their schedules.
                  Filter by this tag to find outpatient rehabilitations centers.
                </li>
                <li>Day Programs</li>
                  <ul>
                    <li>
                      Outpatient day programs have the highest level of care and structure provided within 
                      an outpatient setting. In a day program, clients typically commit to meeting 5-7 days 
                      per week at an outpatient facility for multiple hours each day. 
                    </li>
                  </ul>
                <li>Intensive Outpatient Programs</li>
                  <ul>
                    <li>
                      Intensive outpatient programs establish a treatment plan with defined, measurable 
                      milestones in place to indicate progress. As these milestones are met, the time commitment 
                      required per week decreases.
                    </li>
                  </ul>
                <li>Continuing Care</li>
                  <ul>
                    <li>
                      Continuing care groups such as Narcotics Anonymous are ongoing support resources to help an 
                      individual solidify their commitment to sobriety. The groups are typically facilitated by a 
                      licensed therapist and meet weekly.
                    </li>
                  </ul>
              </ul>
            <li>Gender-Specific Treatment</li>
              <ul>
                <li>
                  Gender-specific addiction treatments are designed to specifically treat men and women separately.
                  According to the National Survey on Drug Use and Health (NSDUH),
                  there are fundamental biological and cultural differences between men and women in terms of substance abuse.
                  Gender-specific treatment programs are sensitive to these differences
                  and address the unique needs of each of the sexes in a comfortable and supportive environment.
                  Filter by this tag to find gender-specific rehabilitations centers.
                </li>
                <ul>
                  <li>Treatment for Men</li>
                  <li>Treatment for Women</li>
                  <li>Treatment for non-binary peoples</li>
                </ul>
              </ul>
            <li>Intervention Specialists</li>
              <ul>
                <li>
                  This is someone who leads the combined efforts of friends and family
                  to get the person with the substance use disorder into treatment.
                  This person is someone who is trained, experienced, and educated about detox and recovery from drugs.
                  For resources in help in staging an intervention, use this tag.
                </li>
                <li>Nutrition Management</li>
                <ul>
                  <li>
                    Nutrition management has been shown to significantly improve opioid-use disorder recovery rates. 
                    Filter by this tag to find treatment centers who offer their own nutrition services or resources 
                    that focus on nutrition management.
                  </li>
                </ul>
              </ul>
            <li>Recovery Residences</li>
              <ul>
                <li>
                  A “recovery residence” means a service that provides alcohol-free and illicit drug-free housing to 
                  individuals with substance-related disorders or addictive disorders or co-occurring mental health 
                  and substance-related disorders or addictive disorders.
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
        <Button href="https://www.drugabuse.gov/publications/drugs-brains-behavior-science-addiction/treatment-recovery" className="mt-auto p-2 resources-button">More on Recovery Treatment</Button>
        </>
      );
    }else if(state.title === "Mental Health Resources"){
      cardContents = (
        <>
        <div className="cardContents">
          <p>
            At its core, an opioid use disorder is a mental health issue.
            Here, we provide resources to counseling, therapy, and support groups
            to help those with OUDs stay safe, continue their recovery and deal with life.
          </p>
          <ul>
            <li>Counseling/Therapy</li>
              <ul>
                <li>
                  A Substance Use Disorder is more than a physical dependence on opioids.
                  Even after detox, there is a high risk for relapse.
                  Certain psychological and social factors can be powerful triggers that lead to relapse,
                  such as stress, environmental pressures, and social networks.
                  Counseling can help escape cravings and manage pressures from everyday life.
                </li>
              </ul>
            <li>Support Groups</li>
              <ul>
                <li>
                  Support groups are offered as a space where individuals can come together
                  to share their stories, experiences, and lives in a way that helps reduce isolation and loneliness.
                  Most follow the 12-step recovery process, which you can learn about
                  here: <a href="https://www.samhsa.gov/treatment-prevention-recovery/12-step-programs">https://www.samhsa.gov/treatment-prevention-recovery/12-step-programs</a>
                </li>
              </ul>
          </ul>
        </div>
        <Button href="https://www.mentalhealth.gov/basics/what-is-mental-health" className="mt-auto p-2 resources-button">More on Mental Health</Button>
        </>
      );
    }else if(state.title === "Harm Reduction"){
      cardContents = (
        <>
        <div className="cardContents">
          <p>
            Harm reduction is a set of strategies and ideas
            aimed at reducing negative consequences associated with drug use.
            This includes reducing blood-borne diseases and fatalities from overdose.
          </p>
          <ul>
            <li>Overdose Response</li>
              <ul>
                <li>
                  Many state-approved programs are able to certify people to administer naloxone,
                  a life-saving drug that reverses the effects of an overdose.
                  Some of these programs are able to distribute naloxone themselves.
                </li>
                <ul>
                  <li>Naloxone Distributor</li>
                  <li>Overdose Response Trainer</li>
                </ul>
              </ul>
            <li>Needle Exchange Programs</li>
              <ul>
                <li>
                  Needle exchange programs&mdash;which are also known as syringe services programs
                  or needle-syringe programs&mdash;provide new and sterile syringes to drug users.
                  This is to reduce transmission of blood-borne diseases such as HIV and Hepatitis C.
                </li>
                <ul>
                  <li>Needle Injection Sites</li>
                  <li>Needle-Transmitted Diseases</li>
                </ul>
              </ul>
            <li>Vaccine and Prophylaxis Clinics</li>
              <ul>
                <li>
                  These clinics are essential to reducing the spread of diseases such as HIV spread by needle sharing.
                  For example, HIV prophylaxis can be used to prevent the transmission of HIV and save lives.
                  For resources on vaccines and prophylaxis, use this tag.
                </li>
              </ul>
          </ul>
        </div>
        <Button href="https://americanaddictioncenters.org/harm-reduction" className="mt-auto p-2 resources-button">More on Harm Reduction</Button>
        </>
      );
    }else if(state.title === "Pregnancy Support"){
      cardContents = (
        <div className="cardContents">
          <p>
            Babies who are exposed to opiates during pregnancy are at risk for
            low birth weight, behavioral problems, developmental delays, learning disabilities, birth defects and stillbirth.
            Effective treatments and pregnancy support services exist for those with opioid use disorders
            and can be found with this tag.
          </p>
        </div>
      );
    }else if(state.title === "Transportation"){
      cardContents = (
        <div className="cardContents">
          <p>
            Transportation is available to those for whom transportation is a barrier to treatment,
            either by the resource itself or a separate organization.
            Filter by this tag to find treatment centers who offer their own transportation services
            or resources that focus solely on transporting people to treatment locations.
          </p>
        </div>
      );
    }else if(state.title === "What is My Account?"){
      cardContents = (
        <div className="cardContents">
          <p>
            Your account is your method of managing resources.
            You are able to bookmark, compare, suggest, and report resources.
            All we need is a username and password to create an account.
            No personal information is required at all.
            We do not collect any information from you other than
            username, password, and bookmarked resources.
          </p>
          <ul>
            <li>Bookmarking resources</li>
            <ul>
              <li>
                You are able to bookmark resources
                by clicking on the bookmark button on the button right hand corner of each resource.
                This will add the resource to the “My Bookmarked Resources”.
                You can also compare your bookmarked resources
                by going to this tab and checking the “Compare” box next to each resource.
              </li>
            </ul>
            <li>Suggesting resources</li>
            <ul>
              <li>
                We understand that we may have missed resources while making the database.
                If you know of any resources in any of the categories,
                please suggest the resource through your account.
                We will audit the submitted resources before adding them to the database.
              </li>
            </ul>
            <li>Reporting resources</li>
            <ul>
              <li>
                We understand that some of our information may potentially be slightly out-of-date.
                If you have any changes you’d like to suggest,
                please do so through the “Report A Resource” tab through your account.
                We will audit the submitted suggestions before changing them in the database.
              </li>
            </ul>
          </ul>
        </div>
      );
    }else if(state.title === "Printing your Resources"){
      cardContents = (
        <div className="cardContents">
          <p>
            You are able to print resources
            by going to the “more details” page for every resource
            and pressing the “Print This Page Icon.”
          </p>
        </div>
      );
    }else if(state.title === "Join a Research Study"){
      cardContents = (
        <>
        <div className="cardContents">
          <p>
            CORA is actively engaged in opioid-related research
            that public services can use to improve their services.
            Data from CORA’s research is published and made publically available.
            Participants of our studies are compensated or have a chance at being compensated.
            If you would like to contribute to the public good and be compensated for it,
            please consider taking 10 minutes to participate in a research study.
          </p>
        </div>
        <Button href="/join-a-research-study" className="mt-auto p-2 resources-button">Learn More</Button>
        </>
      );
    }else if(state.title === "What is CORA?"){
      cardContents = (
        <div className="cardContents">
          <p>
            CORA is a student-run nonprofit that aims to reduce disparities in opioid knowledge and resources.
            We were founded at the University of Maryland, College Park and now have chapters across the nation.
            If you’d like to learn more, visit our website
            at <a href="https://coraumd.wixsite.com/cora">https://coraumd.wixsite.com/cora</a>
          </p>
        </div>
      );
    }else {
      cardContents = (
        <div className="cardContents">
          <p>Nothing Yet</p>
        </div>
      );
    }

    return (
      <Container fluid className="h-100 d-flex flex-column how-to-use-container">
        <Row className="h-100 how-to-use-row">
          {width >= 1250 &&
            <Col className="faqColumn" md={3} lg={3}>
              <div className="line faqButtons">
                <span style={styles} className="circle"/>
                <ButtonGroup vertical>
                  <Button className="titleButtons" onClick={() => setState({yPosition: 25, title: "How to use CORAbase"})}>How to use CORAbase</Button>

                  <Button id="advanced-search" className="titleButtons" onClick={() => setState({yPosition: 80, title: "Advanced Search"})}>Advanced Search</Button>
                  <Button className="subButtons" onClick={() => setState({yPosition: 115, title: "Prevention"})}>Prevention</Button>
                  <Button className="subButtons" onClick={() => setState({yPosition: 150, title: "Recovery"})}>Recovery</Button>
                  <Button className="subButtons" onClick={() => setState({yPosition: 185, title: "Mental Health Resources"})}>Mental Health Resources</Button>
                  <Button className="subButtons" onClick={() => setState({yPosition: 220, title: "Harm Reduction"})}>Harm Reduction</Button>
                  <Button className="subButtons" onClick={() => setState({yPosition: 255, title: "Pregnancy Support"})}>Pregnancy Support</Button>
                  <Button className="subButtons" onClick={() => setState({yPosition: 290, title: "Transportation"})}>Transportation</Button>

                  <Button id="my-account" className="titleButtons" onClick={() => setState({yPosition: 345, title: "What is My Account?"})}>What is My Account?</Button>

                  <Button id="print-resources" className="titleButtons" onClick={() => setState({yPosition: 405, title: "Printing your Resources"})}>Printing your Resources</Button>
                  <Button id="research-studies" className="titleButtons" onClick={() => setState({yPosition: 460, title: "Join a Research Study"})}>Join a Research Study</Button>
                  <Button id="what-is-cora" className="titleButtons" onClick={() => setState({yPosition: 515, title: "What is CORA?"})}>What is CORA?</Button>
                </ButtonGroup>
              </div>
            </Col>
          }
          <Col className="faqCardColumn" style={width < 1250 ? faqCardStyles : {}}>
            {width < 1250 &&
              <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Control as="select" value={state.title} onChange={handleFAQDropdownChange} custom>
                    <option>How to use CORAbase</option>
                    <option>Advanced Search</option>
                    <option>Prevention</option>
                    <option>Recovery</option>
                    <option>Mental Health Resources</option>
                    <option>Harm Reduction</option>
                    <option>Pregnancy Support</option>
                    <option>Transportation</option>
                    <option>What is My Account?</option>
                    <option>Printing your Resources</option>
                    <option>Join a Research Study</option>
                    <option>What is CORA?</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            }
            <Card className="faqCard container">
              <Card.Body className="d-flex align-items-start flex-column how-card">
                <Card.Title className="p-2 faqTitle">{state.title}</Card.Title>
                {cardContents}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
}

export default HowToUseCORABase;
