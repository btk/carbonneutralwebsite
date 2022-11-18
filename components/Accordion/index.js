import Image from 'next/image'
import styles from "./style.module.css"
import { Button, Text, Container, Card, Row, Spacer, Collapse } from '@nextui-org/react';

function Logo({size}){

  return(
    <Collapse.Group>
      <Collapse title="How does it work?">
        <Text>
          The user inputs their domain name into the calculator and the web application will generate a report on the carbon emission of the website depending on the data transfer size and website efficiency. The report will include a set of recommendations on how to reduce the carbon footprint of the website.This calculator will also tell you the amount of trees you should plant to offset your website&apos;s carbon footprint.
        </Text>
      </Collapse>
      <Collapse title="Calculations">
        <Text style={{marginBottom: 10}}>
        Depending on data from <a href="https://carbonfund.org/calculation-methods/" target="_blank" rel="noreferrer">CarbonFund</a> taking the average CO2 per kilowatt hour of <b>0.371 kg per kWh</b> (this value will be changed depending on the country of origin of the users and servers)
        </Text><Text style={{marginBottom: 10}}>
        Depending on the research by <a href="https://www.encon.eu/en" target="_blank" rel="noreferrer">ENCON EU</a>,
        </Text><Text style={{marginBottom: 10}}>
        In summary, it can be concluded that the annual CO2 offsetting rate varies from <b>21.77 kg CO2/tree to 31.5 kg CO2/tree</b>. To compensate for 1 tonne of CO2, 31 to 46 trees are needed. In Europe, there are 300 to 500 trees per hectare. For calculating the figures on the Encon website, we assume a rate of 24 kg CO2/tree and an average of 500 trees per hectare. This means that 1 hectare of forest: 500 trees x 24 kg CO2/tree = 12,000 kg of CO2 offsets, i.e. 12 tonnes CO2/hectare.
        </Text><Text style={{marginBottom: 10}}>
        As an average, this application will assume one tree annual CO2 offsetting rate as <b>24 kg</b>.
        </Text><Text style={{marginBottom: 10}}>
        Carbon emission per kb downloaded;
        </Text><Text style={{marginBottom: 10}}>
        In a 2021 published <a href="https://observablehq.com/@mrchrisadams/carbon-footprint-of-sending-data-around" target="_blank" rel="noreferrer">visual calculation notebook by Chris Adams</a> with energy consumption numbers taken from <a href="https://theshiftproject.org/en/lean-ict-2/" target="_blank" rel="noreferrer">Shift Project&apos;s Lean ICT report</a> concludes that downloading 1 mb of data on average emits 0.866 g of CO2. Note that this number is only the transfer of data between servers, CDNs and user devices, and does not include the user device’s energy consumption to consume this data in terms of consuming content and scrolling through a website.
        </Text><Text style={{marginBottom: 10}}>
        Since our calculations will be in kb, we will accept the kB data transfer as <b>0.866/1024 = 0.000845703125 g CO2 per kb</b>.
        </Text><Text style={{marginBottom: 10}}>
        Carbon emission during Web browsing per minute;
        </Text><Text style={{marginBottom: 10}}>
        Depending on a paper called <a href="https://www.researchgate.net/publication/215697458_An_Analysis_of_Power_Consumption_in_a_Smartphone" target="_blank" rel="noreferrer">An Analysis of Power Consumption in a Smartphone</a> in the section about Web Browsing;
        </Text><Text style={{marginBottom: 10}}>
        Web browsing average power over WiFi and GPRS. Aggregate power consumption is 352.8 mW for WiFi, and 429.0 mW for GPRS, excluding backlight 410.2 mW. The benchmark was trace-based, and ran for a total of 490 seconds.
        </Text><Text style={{marginBottom: 10}}>
        If we accept that half of users will use WiFi and other half celular, in total an average smart device would consume ((352.8 + 429.0) / 2 + 410.2) / (490/60) = <b>98.1 mW of energy per minute</b>.
        </Text><Text style={{marginBottom: 10}}>
        Since most of the energy consumption happens during the page load and idle browsing of a website does not consume as significant of an energy as data transfer energy consumption. We will accept the average session duration as one minute and won’t give an option to the user of the tool to change it. 98.1 mW of energy per page load on a device.
        </Text><Text style={{marginBottom: 10}}>
        In conclusion, 0.371 * (98.1 / 1000000) = <b>0.002183706 g CO2 emitted per page load and browse</b>.
        </Text>
      </Collapse>
      <Collapse title="Option C">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      </Collapse>
    </Collapse.Group>
  );
}

export default Logo;
