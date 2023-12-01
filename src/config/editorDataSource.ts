export const TestData1 = `<XTextDocument xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" EditorVersionString="1.2023.4.28">
   <Attributes>
      <Attribute>
         <Name>DCLocalDataSource</Name>
         <Value>&lt;DataSourceDocument xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" ID="DataSource" Name="DataSource" Guid="9c34a38d-a29b-4685-83f9-db43397b4d3a" Title=""&gt;&lt;Parameters /&gt;&lt;Nodes /&gt;&lt;/DataSourceDocument&gt;</Value>
      </Attribute>
   </Attributes>
   <XElements>
      <Element xsi:type="XTextHeader">
         <InnerID>6</InnerID>
         <AcceptTab>true</AcceptTab>
         <XElements>
            <Element xsi:type="XParagraphFlag" StyleIndex="1">
               <InnerID>7</InnerID>
            </Element>
            <Element xsi:type="XParagraphFlag" StyleIndex="2">
               <InnerID>8</InnerID>
            </Element>
            <Element xsi:type="XParagraphFlag" StyleIndex="2">
               <InnerID>9</InnerID>
            </Element>
            <Element xsi:type="XInputField" StyleIndex="4">
               <InnerID>10</InnerID>
               <ID>机构名称</ID>
               <EnableValueValidate>true</EnableValueValidate>
               <Deleteable>false</Deleteable>
               <BorderElementColor />
               <MoveFocusHotKey>Tab</MoveFocusHotKey>
               <SpecifyWidth>1181.10242</SpecifyWidth>
               <Alignment>Center</Alignment>
               <Name>机构名称</Name>
               <BackgroundText>机构名称</BackgroundText>
            </Element>
            <Element xsi:type="XParagraphFlag" StyleIndex="2">
               <InnerID>11</InnerID>
            </Element>
            <Element xsi:type="XString">
               <InnerID>368</InnerID>
               <Text>科别：</Text>
            </Element>
            <Element xsi:type="XInputField">
               <InnerID>13</InnerID>
               <ID>科别</ID>
               <EnableValueValidate>true</EnableValueValidate>
               <BorderElementColor />
               <Name>科别</Name>
               <BackgroundText>科别</BackgroundText>
            </Element>
            <Element xsi:type="XString">
               <InnerID>369</InnerID>
               <Text>     床号：</Text>
            </Element>
            <Element xsi:type="XInputField">
               <InnerID>15</InnerID>
               <ID>床号</ID>
               <EnableValueValidate>true</EnableValueValidate>
               <BorderElementColor />
               <Name>床号</Name>
               <BackgroundText>床号</BackgroundText>
            </Element>
            <Element xsi:type="XString">
               <InnerID>370</InnerID>
               <Text>床    姓名：</Text>
            </Element>
            <Element xsi:type="XInputField">
               <InnerID>17</InnerID>
               <ID>姓名YM</ID>
               <EnableValueValidate>true</EnableValueValidate>
               <BorderElementColor />
               <Name>姓名</Name>
               <BackgroundText>姓名</BackgroundText>
            </Element>
            <Element xsi:type="XString" StyleIndex="5">
               <InnerID>371</InnerID>
               <Text>    住院号：</Text>
            </Element>
            <Element xsi:type="XInputField" StyleIndex="5">
               <InnerID>19</InnerID>
               <ID>住院号</ID>
               <EnableValueValidate>true</EnableValueValidate>
               <BorderElementColor />
               <Name>住院号</Name>
               <BackgroundText>住院号</BackgroundText>
            </Element>
            <Element xsi:type="XParagraphFlag" StyleIndex="3">
               <InnerID>20</InnerID>
            </Element>
         </XElements>
      </Element>
      <Element xsi:type="XTextBody">
         <InnerID>21</InnerID>
         <AcceptTab>true</AcceptTab>
         <XElements>
            <Element xsi:type="XString" StyleIndex="6">
               <InnerID>372</InnerID>
               <Text>入院记录</Text>
            </Element>
            <Element xsi:type="XParagraphFlag" StyleIndex="10">
               <InnerID>107</InnerID>
            </Element>
            <Element xsi:type="XTextTable" NumOfRows="6" NumOfColumns="2">
               <InnerID>109</InnerID>
               <ID>table1</ID>
               <XElements>
                  <Element xsi:type="XTextTableRow">
                     <InnerID>112</InnerID>
                     <XElements>
                        <Element xsi:type="XTextTableCell" StyleIndex="7">
                           <InnerID>26</InnerID>
                           <XElements>
                              <Element xsi:type="XString">
                                 <InnerID>374</InnerID>
                                 <Text> 姓名：</Text>
                              </Element>
                              <Element xsi:type="XInputField">
                                 <InnerID>119</InnerID>
                                 <ID>姓名</ID>
                                 <EnableValueValidate>true</EnableValueValidate>
                                 <ValueBinding>
                                    <DataSource>EMR_Patients</DataSource>
                                    <BindingPath>Name</BindingPath>
                                 </ValueBinding>
                                 <BorderElementColor />
                                 <MoveFocusHotKey>Tab</MoveFocusHotKey>
                                 <Name>姓名</Name>
                                 <BackgroundText>姓名</BackgroundText>
                              </Element>
                              <Element xsi:type="XParagraphFlag">
                                 <InnerID>123</InnerID>
                              </Element>
                           </XElements>
                        </Element>
                        <Element xsi:type="XTextTableCell" StyleIndex="7">
                           <InnerID>1</InnerID>
                           <XElements>
                              <Element xsi:type="XString">
                                 <InnerID>375</InnerID>
                                 <Text>出生地：</Text>
                              </Element>
                              <Element xsi:type="XInputField">
                                 <InnerID>130</InnerID>
                                 <ID>出生地</ID>
                                 <EnableValueValidate>true</EnableValueValidate>
                                 <ValueBinding>
                                    <DataSource>EMR_Patients</DataSource>
                                    <BindingPath>BirthPlace</BindingPath>
                                 </ValueBinding>
                                 <BorderElementColor />
                                 <MoveFocusHotKey>Tab</MoveFocusHotKey>
                                 <Name>出生地</Name>
                                 <BackgroundText>出生地</BackgroundText>
                              </Element>
                              <Element xsi:type="XParagraphFlag">
                                 <InnerID>137</InnerID>
                              </Element>
                           </XElements>
                        </Element>
                     </XElements>
                  </Element>
                  <Element xsi:type="XTextTableRow">
                     <InnerID>138</InnerID>
                     <XElements>
                        <Element xsi:type="XTextTableCell" StyleIndex="7">
                           <InnerID>2</InnerID>
                           <XElements>
                              <Element xsi:type="XString">
                                 <InnerID>376</InnerID>
                                 <Text> 性别：</Text>
                              </Element>
                              <Element xsi:type="XInputField">
                                 <InnerID>145</InnerID>
                                 <ID>性别</ID>
                                 <EnableValueValidate>true</EnableValueValidate>
                                 <ValueBinding>
                                    <DataSource>EMR_Patients</DataSource>
                                    <BindingPath>sex</BindingPath>
                                 </ValueBinding>
                                 <BorderElementColor />
                                 <MoveFocusHotKey>Tab</MoveFocusHotKey>
                                 <Name>性别</Name>
                                 <BackgroundText>性别</BackgroundText>
                                 <EditorActiveMode>Program F2 MouseClick</EditorActiveMode>
                                 <FieldSettings>
                                    <EditStyle>DropdownList</EditStyle>
                                    <ListSource>
                                       <Items>
                                          <Item>
                                             <Text>男</Text>
                                             <Value>1</Value>
                                          </Item>
                                          <Item>
                                             <Text>女</Text>
                                             <Value>2</Value>
                                          </Item>
                                       </Items>
                                    </ListSource>
                                 </FieldSettings>
                              </Element>
                              <Element xsi:type="XString" WhitespaceCount="2">
                                 <InnerID>377</InnerID>
                                 <Text>  </Text>
                              </Element>
                              <Element xsi:type="XParagraphFlag">
                                 <InnerID>149</InnerID>
                              </Element>
                           </XElements>
                        </Element>
                        <Element xsi:type="XTextTableCell" StyleIndex="7">
                           <InnerID>3</InnerID>
                           <XElements>
                              <Element xsi:type="XString">
                                 <InnerID>378</InnerID>
                                 <Text>职业：</Text>
                              </Element>
                              <Element xsi:type="XInputField">
                                 <InnerID>155</InnerID>
                                 <ID>职业</ID>
                                 <EnableValueValidate>true</EnableValueValidate>
                                 <ValueBinding>
                                    <DataSource>EMR_Patients</DataSource>
                                    <BindingPath>Job</BindingPath>
                                 </ValueBinding>
                                 <BorderElementColor />
                                 <MoveFocusHotKey>Tab</MoveFocusHotKey>
                                 <Name>职业</Name>
                                 <BackgroundText>职业</BackgroundText>
                              </Element>
                              <Element xsi:type="XParagraphFlag">
                                 <InnerID>158</InnerID>
                              </Element>
                           </XElements>
                        </Element>
                     </XElements>
                  </Element>
                  <Element xsi:type="XTextTableRow">
                     <InnerID>159</InnerID>
                     <XElements>
                        <Element xsi:type="XTextTableCell" StyleIndex="7">
                           <InnerID>4</InnerID>
                           <XElements>
                              <Element xsi:type="XString">
                                 <InnerID>379</InnerID>
                                 <Text> 年龄：</Text>
                              </Element>
                              <Element xsi:type="XInputField">
                                 <InnerID>166</InnerID>
                                 <ID>年龄</ID>
                                 <EnableValueValidate>true</EnableValueValidate>
                                 <ValueBinding>
                                    <DataSource>EMR_Patients</DataSource>
                                    <BindingPath>Age</BindingPath>
                                 </ValueBinding>
                                 <BorderElementColor />
                                 <MoveFocusHotKey>Tab</MoveFocusHotKey>
                                 <Name>年龄</Name>
                                 <BackgroundText>年龄</BackgroundText>
                                 <FieldSettings>
                                    <EditStyle>Numeric</EditStyle>
                                 </FieldSettings>
                              </Element>
                              <Element xsi:type="XString">
                                 <InnerID>380</InnerID>
                                 <Text>岁</Text>
                              </Element>
                              <Element xsi:type="XParagraphFlag">
                                 <InnerID>170</InnerID>
                              </Element>
                           </XElements>
                        </Element>
                        <Element xsi:type="XTextTableCell" StyleIndex="7">
                           <InnerID>5</InnerID>
                           <XElements>
                              <Element xsi:type="XString">
                                 <InnerID>381</InnerID>
                                 <Text>入院时间：</Text>
                              </Element>
                              <Element xsi:type="XInputField">
                                 <InnerID>178</InnerID>
                                 <ID>入院时间</ID>
                                 <EnableValueValidate>true</EnableValueValidate>
                                 <ValueBinding>
                                    <DataSource>EMR_Patients</DataSource>
                                    <BindingPath>indate</BindingPath>
                                 </ValueBinding>
                                 <BorderElementColor />
                                 <MoveFocusHotKey>Tab</MoveFocusHotKey>
                                 <Name>入院时间</Name>
                                 <DisplayFormat>
                                    <Style>DateTime</Style>
                                    <Format>yyyy-MM-dd HH:mm:ss</Format>
                                 </DisplayFormat>
                                 <BackgroundText>入院时间</BackgroundText>
                                 <EditorActiveMode>Program F2 MouseClick</EditorActiveMode>
                                 <FieldSettings>
                                    <EditStyle>DateTime</EditStyle>
                                 </FieldSettings>
                              </Element>
                              <Element xsi:type="XParagraphFlag">
                                 <InnerID>198</InnerID>
                              </Element>
                           </XElements>
                        </Element>
                     </XElements>
                  </Element>
                  <Element xsi:type="XTextTableRow">
                     <InnerID>199</InnerID>
                     <XElements>
                        <Element xsi:type="XTextTableCell" StyleIndex="7">
                           <InnerID>6</InnerID>
                           <XElements>
                              <Element xsi:type="XString">
                                 <InnerID>382</InnerID>
                                 <Text> 民族：</Text>
                              </Element>
                              <Element xsi:type="XInputField" StyleIndex="8">
                                 <InnerID>206</InnerID>
                                 <ID>民族</ID>
                                 <EnableValueValidate>true</EnableValueValidate>
                                 <ValueBinding>
                                    <DataSource>EMR_Patients</DataSource>
                                    <BindingPath>mingzu</BindingPath>
                                 </ValueBinding>
                                 <BorderElementColor />
                                 <MoveFocusHotKey>Tab</MoveFocusHotKey>
                                 <Name>民族</Name>
                                 <BackgroundText>民族</BackgroundText>
                                 <EditorActiveMode>Program F2 MouseClick</EditorActiveMode>
                                 <FieldSettings>
                                    <EditStyle>DropdownList</EditStyle>
                                    <ListSource>
                                       <Items>
                                          <Item>
                                             <Text>汉族</Text>
                                             <Value>01</Value>
                                          </Item>
                                          <Item>
                                             <Text>蒙古族</Text>
                                             <Value>02</Value>
                                          </Item>
                                          <Item>
                                             <Text>回族</Text>
                                             <Value>03</Value>
                                          </Item>
                                          <Item>
                                             <Text>藏族</Text>
                                             <Value>04</Value>
                                          </Item>
                                          <Item>
                                             <Text>维吾尔族</Text>
                                             <Value>05</Value>
                                          </Item>
                                          <Item>
                                             <Text>苗族</Text>
                                             <Value>06</Value>
                                          </Item>
                                          <Item>
                                             <Text>彝族</Text>
                                             <Value>07</Value>
                                          </Item>
                                          <Item>
                                             <Text>壮族</Text>
                                             <Value>08</Value>
                                          </Item>
                                          <Item>
                                             <Text>布依族</Text>
                                             <Value>09</Value>
                                          </Item>
                                          <Item>
                                             <Text>朝鲜族</Text>
                                             <Value>10</Value>
                                          </Item>
                                          <Item>
                                             <Text>满族</Text>
                                             <Value>11</Value>
                                          </Item>
                                          <Item>
                                             <Text>侗族</Text>
                                             <Value>12</Value>
                                          </Item>
                                          <Item>
                                             <Text>瑶族</Text>
                                             <Value>13</Value>
                                          </Item>
                                          <Item>
                                             <Text>白族</Text>
                                             <Value>14</Value>
                                          </Item>
                                          <Item>
                                             <Text>土家族</Text>
                                             <Value>15</Value>
                                          </Item>
                                          <Item>
                                             <Text>哈尼族</Text>
                                             <Value>16</Value>
                                          </Item>
                                          <Item>
                                             <Text>哈萨克族</Text>
                                             <Value>17</Value>
                                          </Item>
                                          <Item>
                                             <Text>傣族</Text>
                                             <Value>18</Value>
                                          </Item>
                                          <Item>
                                             <Text>黎族</Text>
                                             <Value>19</Value>
                                          </Item>
                                          <Item>
                                             <Text>傈僳族</Text>
                                             <Value>20</Value>
                                          </Item>
                                          <Item>
                                             <Text>佤族</Text>
                                             <Value>21</Value>
                                          </Item>
                                          <Item>
                                             <Text>畲族</Text>
                                             <Value>22</Value>
                                          </Item>
                                       </Items>
                                    </ListSource>
                                 </FieldSettings>
                              </Element>
                              <Element xsi:type="XString" StyleIndex="8" WhitespaceCount="1">
                                 <InnerID>383</InnerID>
                                 <Text> </Text>
                              </Element>
                              <Element xsi:type="XParagraphFlag">
                                 <InnerID>210</InnerID>
                              </Element>
                           </XElements>
                        </Element>
                        <Element xsi:type="XTextTableCell" StyleIndex="7">
                           <InnerID>7</InnerID>
                           <XElements>
                              <Element xsi:type="XString">
                                 <InnerID>384</InnerID>
                                 <Text>记录时间：</Text>
                              </Element>
                              <Element xsi:type="XInputField">
                                 <InnerID>218</InnerID>
                                 <ID>记录时间</ID>
                                 <EnableValueValidate>true</EnableValueValidate>
                                 <ValueBinding>
                                    <DataSource>EMR_Patients</DataSource>
                                    <BindingPath>recorddate</BindingPath>
                                 </ValueBinding>
                                 <BorderElementColor />
                                 <MoveFocusHotKey>Tab</MoveFocusHotKey>
                                 <Name>记录时间</Name>
                                 <BackgroundText>记录时间</BackgroundText>
                                 <EditorActiveMode>Program F2 MouseClick</EditorActiveMode>
                                 <FieldSettings>
                                    <EditStyle>DateTime</EditStyle>
                                 </FieldSettings>
                              </Element>
                              <Element xsi:type="XParagraphFlag">
                                 <InnerID>228</InnerID>
                              </Element>
                           </XElements>
                        </Element>
                     </XElements>
                  </Element>
                  <Element xsi:type="XTextTableRow">
                     <InnerID>229</InnerID>
                     <XElements>
                        <Element xsi:type="XTextTableCell" StyleIndex="7">
                           <InnerID>8</InnerID>
                           <XElements>
                              <Element xsi:type="XString">
                                 <InnerID>385</InnerID>
                                 <Text> 婚姻：</Text>
                              </Element>
                              <Element xsi:type="XInputField">
                                 <InnerID>236</InnerID>
                                 <ID>婚姻</ID>
                                 <EnableValueValidate>true</EnableValueValidate>
                                 <ValueBinding>
                                    <DataSource>EMR_Patients</DataSource>
                                    <BindingPath>marriage</BindingPath>
                                 </ValueBinding>
                                 <BorderElementColor />
                                 <MoveFocusHotKey>Tab</MoveFocusHotKey>
                                 <Name>婚姻</Name>
                                 <BackgroundText>婚姻</BackgroundText>
                                 <EditorActiveMode>Program F2 MouseClick</EditorActiveMode>
                                 <FieldSettings>
                                    <EditStyle>DropdownList</EditStyle>
                                    <ListSource>
                                       <Items>
                                          <Item>
                                             <Text>未婚</Text>
                                             <Value>0</Value>
                                          </Item>
                                          <Item>
                                             <Text>已婚</Text>
                                             <Value>1</Value>
                                          </Item>
                                          <Item>
                                             <Text>离异</Text>
                                             <Value>2</Value>
                                          </Item>
                                          <Item>
                                             <Text>丧偶</Text>
                                             <Value>3</Value>
                                          </Item>
                                          <Item>
                                             <Text>其他</Text>
                                             <Value>4</Value>
                                          </Item>
                                       </Items>
                                    </ListSource>
                                 </FieldSettings>
                              </Element>
                              <Element xsi:type="XString" WhitespaceCount="2">
                                 <InnerID>386</InnerID>
                                 <Text>  </Text>
                              </Element>
                              <Element xsi:type="XParagraphFlag">
                                 <InnerID>243</InnerID>
                              </Element>
                           </XElements>
                        </Element>
                        <Element xsi:type="XTextTableCell" StyleIndex="7">
                           <InnerID>9</InnerID>
                           <XElements>
                              <Element xsi:type="XString">
                                 <InnerID>387</InnerID>
                                 <Text>病史陈述者：</Text>
                              </Element>
                              <Element xsi:type="XInputField">
                                 <InnerID>252</InnerID>
                                 <ID>病史陈述者</ID>
                                 <EnableValueValidate>true</EnableValueValidate>
                                 <ValueBinding>
                                    <DataSource>EMR_Patients</DataSource>
                                    <BindingPath>patientname</BindingPath>
                                 </ValueBinding>
                                 <BorderElementColor />
                                 <MoveFocusHotKey>Tab</MoveFocusHotKey>
                                 <Name>病史陈述者</Name>
                                 <BackgroundText>病史陈述者</BackgroundText>
                              </Element>
                              <Element xsi:type="XParagraphFlag">
                                 <InnerID>256</InnerID>
                              </Element>
                           </XElements>
                        </Element>
                     </XElements>
                  </Element>
                  <Element xsi:type="XTextTableRow">
                     <InnerID>257</InnerID>
                     <XElements>
                        <Element xsi:type="XTextTableCell" StyleIndex="7">
                           <InnerID>10</InnerID>
                           <XElements>
                              <Element xsi:type="XString">
                                 <InnerID>388</InnerID>
                                 <Text> 发病节气：</Text>
                              </Element>
                              <Element xsi:type="XInputField">
                                 <InnerID>266</InnerID>
                                 <ID>发病季节</ID>
                                 <EnableValueValidate>true</EnableValueValidate>
                                 <BorderElementColor />
                                 <Name>发病节气</Name>
                                 <BackgroundText>发病节气</BackgroundText>
                              </Element>
                              <Element xsi:type="XParagraphFlag">
                                 <InnerID>267</InnerID>
                              </Element>
                           </XElements>
                        </Element>
                        <Element xsi:type="XTextTableCell" StyleIndex="7">
                           <InnerID>11</InnerID>
                           <XElements>
                              <Element xsi:type="XParagraphFlag">
                                 <InnerID>271</InnerID>
                              </Element>
                           </XElements>
                        </Element>
                     </XElements>
                  </Element>
               </XElements>
               <Columns>
                  <Element xsi:type="XTextTableColumn">
                     <InnerID>110</InnerID>
                     <Width>937.375</Width>
                  </Element>
                  <Element xsi:type="XTextTableColumn">
                     <InnerID>111</InnerID>
                     <Width>957.375</Width>
                  </Element>
               </Columns>
            </Element>
            <Element xsi:type="XParagraphFlag" StyleIndex="9">
               <InnerID>273</InnerID>
            </Element>
            <Element xsi:type="XString">
               <InnerID>373</InnerID>
               <Text>                                                     医师签名：</Text>
            </Element>
            <Element xsi:type="XInputField">
               <InnerID>333</InnerID>
               <ID>医师签名</ID>
               <EnableValueValidate>true</EnableValueValidate>
               <BorderElementColor />
               <MoveFocusHotKey>Tab</MoveFocusHotKey>
               <SpecifyWidth>236.2205</SpecifyWidth>
               <Name>医师签名</Name>
               <BackgroundText>医师签名</BackgroundText>
            </Element>
            <Element xsi:type="XParagraphFlag" StyleIndex="9">
               <InnerID>334</InnerID>
            </Element>
            <Element xsi:type="XParagraphFlag">
               <InnerID>336</InnerID>
            </Element>
         </XElements>
      </Element>
      <Element xsi:type="XTextFooter">
         <InnerID>91</InnerID>
         <AcceptTab>true</AcceptTab>
         <XElements>
            <Element xsi:type="XString">
               <InnerID>389</InnerID>
               <Text>                                   第</Text>
            </Element>
            <Element xsi:type="XPageInfo">
               <InnerID>93</InnerID>
               <Width>85</Width>
               <AutoHeight>true</AutoHeight>
               <Height>62.7343674</Height>
               <FormatString>[%PageIndex%]</FormatString>
            </Element>
            <Element xsi:type="XString">
               <InnerID>390</InnerID>
               <Text>页</Text>
            </Element>
            <Element xsi:type="XParagraphFlag">
               <InnerID>95</InnerID>
            </Element>
         </XElements>
      </Element>
   </XElements>
   <SerializeParameterValue>true</SerializeParameterValue>
   <FileFormat>XML</FileFormat>
   <ContentStyles>
      <Default xsi:type="DocumentContentStyle">
         <FontName>宋体</FontName>
         <FontSize>12</FontSize>
      </Default>
      <Styles>
         <Style Index="0">
            <FontName>宋体</FontName>
            <FontSize>12</FontSize>
            <Align>Center</Align>
         </Style>
         <Style Index="1">
            <BackgroundColor>#00000000</BackgroundColor>
            <FontName>宋体</FontName>
            <FontSize>12</FontSize>
            <LineSpacingStyle>Space1pt5</LineSpacingStyle>
            <Align>Center</Align>
         </Style>
         <Style Index="2">
            <FontName>宋体</FontName>
            <FontSize>12</FontSize>
            <LineSpacingStyle>SpaceMultiple</LineSpacingStyle>
            <LineSpacing>1.2</LineSpacing>
            <Align>Center</Align>
         </Style>
         <Style Index="3">
            <FontName>宋体</FontName>
            <FontSize>12</FontSize>
            <LineSpacingStyle>SpaceMultiple</LineSpacingStyle>
            <LineSpacing>1.2</LineSpacing>
         </Style>
         <Style Index="4">
            <FontName>宋体</FontName>
            <FontSize>15</FontSize>
            <Bold>true</Bold>
            <Align>Center</Align>
         </Style>
         <Style Index="5">
            <FontName>宋体</FontName>
            <FontSize>12</FontSize>
            <BorderLeft>true</BorderLeft>
            <BorderBottom>true</BorderBottom>
            <BorderTop>true</BorderTop>
            <BorderRight>true</BorderRight>
         </Style>
         <Style Index="6">
            <FontName>宋体</FontName>
            <FontSize>18</FontSize>
            <Bold>true</Bold>
         </Style>
         <Style Index="7">
            <FontName>宋体</FontName>
            <FontSize>12</FontSize>
            <BorderWidth>1</BorderWidth>
            <PaddingLeft>15</PaddingLeft>
            <PaddingTop>10</PaddingTop>
            <PaddingRight>12.5</PaddingRight>
            <PaddingBottom>10</PaddingBottom>
         </Style>
         <Style Index="8">
            <FontName>宋体</FontName>
            <FontSize>10.5</FontSize>
         </Style>
         <Style Index="9">
            <FontName>宋体</FontName>
            <FontSize>12</FontSize>
            <LineSpacingStyle>Space1pt5</LineSpacingStyle>
         </Style>
         <Style Index="10">
            <FontName>宋体</FontName>
            <FontSize>12</FontSize>
            <LineSpacingStyle>Space1pt5</LineSpacingStyle>
            <Align>Center</Align>
         </Style>
      </Styles>
   </ContentStyles>
   <Info>
      <LicenseText>都昌:都昌旗舰版（100并发）</LicenseText>
      <CreationTime>1980-01-01T00:00:00</CreationTime>
      <LastModifiedTime>2023-08-30T16:20:01.0935127+08:00</LastModifiedTime>
      <LastPrintTime>1980-01-01T00:00:00</LastPrintTime>
      <Operator>DCSoft.Writer Version:1.2019.1.4</Operator>
      <NumOfPage>1</NumOfPage>
   </Info>
   <BodyText>入院记录

 姓名： 出生地： 
 性别：   职业： 
 年龄：岁 入院时间： 
 民族：  记录时间： 
 婚姻：   病史陈述者： 
 发病节气：   
                                                     医师签名：
</BodyText>
   <LocalConfig />
   <PageSettings>
      <LeftMargin>95</LeftMargin>
      <RightMargin>95</RightMargin>
      <StrictUsePageSize>false</StrictUsePageSize>
   </PageSettings>
</XTextDocument>`;

export const TestData2 = `<XTextDocument xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" EditorVersionString="1.2023.4.28">
<XElements>
   <Element xsi:type="XTextHeader">
      <InnerID>6</InnerID>
      <AcceptTab>true</AcceptTab>
      <XElements>
         <Element xsi:type="XInputField" StyleIndex="1">
            <Attributes>
               <Attribute>
                  <Name>ID</Name>
                  <Value>b6cffed9-80f6-48dc-b82c-d3610f7abd9a</Value>
               </Attribute>
            </Attributes>
            <InnerID>119</InnerID>
            <ID>医院名称</ID>
            <EnableValueValidate>true</EnableValueValidate>
            <XElements>
               <Element xsi:type="XString" StyleIndex="1">
                  <InnerID>859</InnerID>
                  <Text>社区卫生服务中心</Text>
               </Element>
            </XElements>
            <BorderElementColor />
            <Name>59966178-271c-4cc4-abf9-c79d664be178</Name>
            <InnerValue>社区卫生服务中心</InnerValue>
            <BackgroundText>医院名称</BackgroundText>
            <EditorActiveMode>F2 MouseDblClick MouseClick</EditorActiveMode>
         </Element>
         <Element xsi:type="XParagraphFlag" StyleIndex="0">
            <InnerID>128</InnerID>
         </Element>
         <Element xsi:type="XString" StyleIndex="1">
            <InnerID>850</InnerID>
            <Text>神经外科护理记录单</Text>
         </Element>
         <Element xsi:type="XParagraphFlag" StyleIndex="0">
            <InnerID>139</InnerID>
         </Element>
         <Element xsi:type="XString">
            <InnerID>851</InnerID>
            <Text>姓名</Text>
         </Element>
         <Element xsi:type="XInputField">
            <Attributes>
               <Attribute>
                  <Name>ID</Name>
                  <Value>ca9a744f-8026-4b94-b59d-7986bc1ef684</Value>
               </Attribute>
            </Attributes>
            <InnerID>143</InnerID>
            <ID>姓名</ID>
            <EnableValueValidate>true</EnableValueValidate>
            <BorderElementColor />
            <Name>96141e24-4e9b-4056-b6a4-cd34d2eb66f8</Name>
            <BackgroundText>XXXX</BackgroundText>
            <EditorActiveMode>F2 MouseDblClick MouseClick</EditorActiveMode>
         </Element>
         <Element xsi:type="XString">
            <InnerID>852</InnerID>
            <Text> 年龄</Text>
         </Element>
         <Element xsi:type="XInputField">
            <Attributes>
               <Attribute>
                  <Name>ID</Name>
                  <Value>44f49606-6602-4595-8e42-0325574a8cf4</Value>
               </Attribute>
            </Attributes>
            <InnerID>147</InnerID>
            <ID>年龄</ID>
            <EnableValueValidate>true</EnableValueValidate>
            <BorderElementColor />
            <Name>1409339b-1fe2-406f-9f19-134789af796e</Name>
            <BackgroundText>XXXX</BackgroundText>
            <EditorActiveMode>F2 MouseDblClick MouseClick</EditorActiveMode>
         </Element>
         <Element xsi:type="XString">
            <InnerID>853</InnerID>
            <Text> 性别</Text>
         </Element>
         <Element xsi:type="XInputField">
            <Attributes>
               <Attribute>
                  <Name>ID</Name>
                  <Value>905a3502-5ae5-47de-9903-4c0761322f71</Value>
               </Attribute>
            </Attributes>
            <InnerID>151</InnerID>
            <ID>性别</ID>
            <EnableValueValidate>true</EnableValueValidate>
            <BorderElementColor />
            <Name>48fb8187-f84c-47e3-ab9f-45fc86a5627b</Name>
            <BackgroundText>XX</BackgroundText>
            <EditorActiveMode>F2 MouseDblClick MouseClick</EditorActiveMode>
         </Element>
         <Element xsi:type="XString">
            <InnerID>854</InnerID>
            <Text> 科别</Text>
         </Element>
         <Element xsi:type="XInputField">
            <Attributes>
               <Attribute>
                  <Name>ID</Name>
                  <Value>5bd34653-34ad-465c-881f-56cdf6edcbd7</Value>
               </Attribute>
            </Attributes>
            <InnerID>155</InnerID>
            <ID>入院科室</ID>
            <EnableValueValidate>true</EnableValueValidate>
            <BorderElementColor />
            <Name>89fafddb-4676-4b5f-9c7d-b88d3e3c1d94</Name>
            <BackgroundText>XXXX</BackgroundText>
            <EditorActiveMode>F2 MouseDblClick MouseClick</EditorActiveMode>
         </Element>
         <Element xsi:type="XString">
            <InnerID>855</InnerID>
            <Text> 床号</Text>
         </Element>
         <Element xsi:type="XInputField">
            <Attributes>
               <Attribute>
                  <Name>ID</Name>
                  <Value>bea82ebe-e9f9-4c07-8884-3d22e9c10a27</Value>
               </Attribute>
            </Attributes>
            <InnerID>159</InnerID>
            <ID>床号</ID>
            <EnableValueValidate>true</EnableValueValidate>
            <BorderElementColor />
            <Name>96141e24-4e9b-4056-b6a4-cd34d2eb66f8</Name>
            <BackgroundText>XX</BackgroundText>
            <EditorActiveMode>F2 MouseDblClick MouseClick</EditorActiveMode>
         </Element>
         <Element xsi:type="XString">
            <InnerID>856</InnerID>
            <Text> 入院日期</Text>
         </Element>
         <Element xsi:type="XInputField">
            <Attributes>
               <Attribute>
                  <Name>ID</Name>
                  <Value>b6060a20-a110-475a-a68b-b58d8c48351b</Value>
               </Attribute>
            </Attributes>
            <InnerID>165</InnerID>
            <ID>入院日期</ID>
            <EnableValueValidate>true</EnableValueValidate>
            <BorderElementColor />
            <UserEditable>false</UserEditable>
            <Name>529cdc52-28c4-4041-9d11-28a99f061350</Name>
            <DisplayFormat>
               <Style>DateTime</Style>
               <Format>yyyy年MM月dd日</Format>
            </DisplayFormat>
            <BackgroundText>yyyy年MM月dd日</BackgroundText>
            <EditorActiveMode>F2 MouseDblClick MouseClick</EditorActiveMode>
            <FieldSettings>
               <EditStyle>DateTime</EditStyle>
            </FieldSettings>
         </Element>
         <Element xsi:type="XString">
            <InnerID>857</InnerID>
            <Text> 住院号</Text>
         </Element>
         <Element xsi:type="XInputField">
            <Attributes>
               <Attribute>
                  <Name>ID</Name>
                  <Value>0da2ade7-2028-4c37-990e-a0d5f1b5fd09</Value>
               </Attribute>
            </Attributes>
            <InnerID>170</InnerID>
            <ID>住院号</ID>
            <EnableValueValidate>true</EnableValueValidate>
            <BorderElementColor />
            <Name>96141e24-4e9b-4056-b6a4-cd34d2eb66f8</Name>
            <BackgroundText>XXXXXXXXXX</BackgroundText>
            <EditorActiveMode>F2 MouseDblClick MouseClick</EditorActiveMode>
         </Element>
         <Element xsi:type="XString">
            <InnerID>858</InnerID>
            <Text> 诊断</Text>
         </Element>
         <Element xsi:type="XInputField">
            <Attributes>
               <Attribute>
                  <Name>ID</Name>
                  <Value>f592f244-ae49-474e-b61a-93e06c03abc2</Value>
               </Attribute>
            </Attributes>
            <InnerID>174</InnerID>
            <ID>护理记录诊断</ID>
            <EnableValueValidate>true</EnableValueValidate>
            <BorderElementColor />
            <Name>96141e24-4e9b-4056-b6a4-cd34d2eb66f8</Name>
            <BackgroundText>XXXX</BackgroundText>
            <EditorActiveMode>F2 MouseDblClick MouseClick</EditorActiveMode>
         </Element>
         <Element xsi:type="XParagraphFlag">
            <InnerID>175</InnerID>
         </Element>
      </XElements>
   </Element>
   <Element xsi:type="XTextBody">
      <InnerID>29</InnerID>
      <AcceptTab>true</AcceptTab>
      <XElements>
         <Element xsi:type="XTextTable" NumOfRows="4" NumOfColumns="22">
            <Attributes>
               <Attribute>
                  <Name>direction</Name>
                  <Value>horizontal</Value>
               </Attribute>
               <Attribute>
                  <Name>tableHeaderNumber</Name>
                  <Value>3</Value>
               </Attribute>
            </Attributes>
            <InnerID>179</InnerID>
            <ID>3</ID>
            <XElements>
               <Element xsi:type="XTextTableRow">
                  <InnerID>202</InnerID>
                  <XElements>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <Attributes>
                           <Attribute>
                              <Name>displayType</Name>
                              <Value>date</Value>
                           </Attribute>
                        </Attributes>
                        <InnerID>32</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>860</InnerID>
                              <Text>日期</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>207</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                        <RowSpan>3</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <Attributes>
                           <Attribute>
                              <Name>displayType</Name>
                              <Value>time</Value>
                           </Attribute>
                        </Attributes>
                        <InnerID>1</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>861</InnerID>
                              <Text>时间</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>212</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                        <RowSpan>3</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>2</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>862</InnerID>
                              <Text>意识</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>217</InnerID>
                           </Element>
                        </XElements>
                        <RowSpan>3</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>3</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>863</InnerID>
                              <Text>体</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>221</InnerID>
                           </Element>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>864</InnerID>
                              <Text>温</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>224</InnerID>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>4</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>865</InnerID>
                              <Text>脉搏</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>229</InnerID>
                           </Element>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>866</InnerID>
                              <Text>/心率</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>234</InnerID>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>5</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>867</InnerID>
                              <Text>呼吸</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>239</InnerID>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>6</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>868</InnerID>
                              <Text>血压</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>244</InnerID>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>7</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>869</InnerID>
                              <Text>血氧饱和度</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>252</InnerID>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>8</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>870</InnerID>
                              <Text>吸氧</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>257</InnerID>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>9</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>871</InnerID>
                              <Text>入量</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>262</InnerID>
                           </Element>
                        </XElements>
                        <ColSpan>2</ColSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>963</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>556</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>10</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>872</InnerID>
                              <Text>出量</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>267</InnerID>
                           </Element>
                        </XElements>
                        <ColSpan>3</ColSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>964</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>559</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>965</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>560</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>11</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>873</InnerID>
                              <Text>皮</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>271</InnerID>
                           </Element>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>874</InnerID>
                              <Text>肤</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>274</InnerID>
                           </Element>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>875</InnerID>
                              <Text>情</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>277</InnerID>
                           </Element>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>876</InnerID>
                              <Text>况</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>280</InnerID>
                           </Element>
                        </XElements>
                        <RowSpan>3</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>12</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>877</InnerID>
                              <Text>肢体活动</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>287</InnerID>
                           </Element>
                        </XElements>
                        <ColSpan>2</ColSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>966</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>569</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>13</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>878</InnerID>
                              <Text>瞳孔</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>292</InnerID>
                           </Element>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>879</InnerID>
                              <Text>大小</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>296</InnerID>
                           </Element>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>880</InnerID>
                              <Text>左/右</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>301</InnerID>
                           </Element>
                        </XElements>
                        <RowSpan>3</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>14</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>881</InnerID>
                              <Text>瞳孔</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>306</InnerID>
                           </Element>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>882</InnerID>
                              <Text>反射</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>310</InnerID>
                           </Element>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>883</InnerID>
                              <Text>左/右</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>315</InnerID>
                           </Element>
                        </XElements>
                        <RowSpan>3</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>15</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>884</InnerID>
                              <Text>管</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>319</InnerID>
                           </Element>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>885</InnerID>
                              <Text>道</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>322</InnerID>
                           </Element>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>886</InnerID>
                              <Text>护</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>325</InnerID>
                           </Element>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>887</InnerID>
                              <Text>理</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>328</InnerID>
                           </Element>
                        </XElements>
                        <RowSpan>3</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <Attributes>
                           <Attribute>
                              <Name>displayType</Name>
                              <Value>box</Value>
                           </Attribute>
                        </Attributes>
                        <InnerID>16</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>888</InnerID>
                              <Text>病情观察及措施</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>338</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                        <RowSpan>3</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>17</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>889</InnerID>
                              <Text>护士签名</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>345</InnerID>
                           </Element>
                        </XElements>
                        <RowSpan>3</RowSpan>
                     </Element>
                  </XElements>
                  <CanSplitByPageLine>false</CanSplitByPageLine>
                  <HeaderStyle>true</HeaderStyle>
               </Element>
               <Element xsi:type="XTextTableRow">
                  <InnerID>346</InnerID>
                  <XElements>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>967</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>599</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>968</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>600</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>969</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>601</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <Attributes>
                           <Attribute>
                              <Name>displayType</Name>
                              <Value>number</Value>
                           </Attribute>
                        </Attributes>
                        <InnerID>18</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>890</InnerID>
                              <Text>℃</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>350</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                        <RowSpan>2</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <Attributes>
                           <Attribute>
                              <Name>displayType</Name>
                              <Value>number</Value>
                           </Attribute>
                        </Attributes>
                        <InnerID>19</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>891</InnerID>
                              <Text>次/分</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>356</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                        <RowSpan>2</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <Attributes>
                           <Attribute>
                              <Name>displayType</Name>
                              <Value>number</Value>
                           </Attribute>
                        </Attributes>
                        <InnerID>20</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>892</InnerID>
                              <Text>次/分</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>362</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                        <RowSpan>2</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <Attributes>
                           <Attribute>
                              <Name>displayType</Name>
                              <Value>text</Value>
                           </Attribute>
                        </Attributes>
                        <InnerID>21</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>893</InnerID>
                              <Text>mmHg</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>369</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                        <RowSpan>2</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <Attributes>
                           <Attribute>
                              <Name>displayType</Name>
                              <Value>number</Value>
                           </Attribute>
                        </Attributes>
                        <InnerID>22</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>894</InnerID>
                              <Text>%</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>373</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                        <RowSpan>2</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <Attributes>
                           <Attribute>
                              <Name>displayType</Name>
                              <Value>number</Value>
                           </Attribute>
                        </Attributes>
                        <InnerID>23</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>895</InnerID>
                              <Text>L/min</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>381</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                        <RowSpan>2</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>24</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>896</InnerID>
                              <Text>名称</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>386</InnerID>
                           </Element>
                        </XElements>
                        <RowSpan>2</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <Attributes>
                           <Attribute>
                              <Name>displayType</Name>
                              <Value>number</Value>
                           </Attribute>
                        </Attributes>
                        <InnerID>25</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>897</InnerID>
                              <Text>ml</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>391</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                        <RowSpan>2</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>26</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>898</InnerID>
                              <Text>名称</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>396</InnerID>
                           </Element>
                        </XElements>
                        <RowSpan>2</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <Attributes>
                           <Attribute>
                              <Name>displayType</Name>
                              <Value>number</Value>
                           </Attribute>
                        </Attributes>
                        <InnerID>27</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>899</InnerID>
                              <Text>ml</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>401</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                        <RowSpan>2</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>28</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>900</InnerID>
                              <Text>颜色性状</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>408</InnerID>
                           </Element>
                        </XElements>
                        <RowSpan>2</RowSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>970</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>631</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>29</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>901</InnerID>
                              <Text>左</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>412</InnerID>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>30</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>902</InnerID>
                              <Text>右</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>416</InnerID>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>971</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>634</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>972</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>635</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>973</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>636</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>974</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>637</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>975</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>638</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                  </XElements>
                  <CanSplitByPageLine>false</CanSplitByPageLine>
                  <HeaderStyle>true</HeaderStyle>
               </Element>
               <Element xsi:type="XTextTableRow">
                  <InnerID>417</InnerID>
                  <XElements>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>976</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>639</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>977</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>640</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>978</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>641</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>979</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>642</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>980</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>643</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>981</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>644</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>982</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>645</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>983</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>646</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>984</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>647</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>985</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>648</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>986</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>649</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>987</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>650</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>988</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>651</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>989</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>652</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell">
                        <InnerID>990</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>653</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>31</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>903</InnerID>
                              <Text>上下</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>422</InnerID>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>32</InnerID>
                        <XElements>
                           <Element xsi:type="XString" StyleIndex="3">
                              <InnerID>904</InnerID>
                              <Text>上下</Text>
                           </Element>
                           <Element xsi:type="XParagraphFlag" StyleIndex="6">
                              <InnerID>427</InnerID>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>991</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>658</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>992</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>659</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>993</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>660</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>994</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>661</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="2">
                        <InnerID>995</InnerID>
                        <XElements>
                           <Element xsi:type="XParagraphFlag">
                              <InnerID>662</InnerID>
                              <AutoCreate>true</AutoCreate>
                           </Element>
                        </XElements>
                     </Element>
                  </XElements>
                  <CanSplitByPageLine>false</CanSplitByPageLine>
                  <HeaderStyle>true</HeaderStyle>
               </Element>
               <Element xsi:type="XTextTableRow">
                  <InnerID>428</InnerID>
                  <ID>row9</ID>
                  <ValueBinding>
                     <DataSource>peopledatasource</DataSource>
                  </ValueBinding>
                  <XElements>
                     <Element xsi:type="XTextTableCell" StyleIndex="7">
                        <InnerID>33</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>432</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                        <ColSpan>2</ColSpan>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="4">
                        <InnerID>34</InnerID>
                        <ValueBinding>
                           <BindingPath>Time</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>436</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>35</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>440</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>36</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>444</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>37</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>448</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>38</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>452</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>39</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>456</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>40</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>460</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>41</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>464</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>42</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>468</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>43</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>472</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>44</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>476</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>45</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>480</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>46</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>484</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>47</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>488</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>48</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>492</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>49</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>496</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>50</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>500</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>51</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>504</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>52</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>508</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>53</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>512</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                     <Element xsi:type="XTextTableCell" StyleIndex="8">
                        <InnerID>54</InnerID>
                        <ValueBinding>
                           <BindingPath>Data</BindingPath>
                        </ValueBinding>
                        <XElements>
                           <Element xsi:type="XParagraphFlag" StyleIndex="5">
                              <InnerID>516</InnerID>
                           </Element>
                        </XElements>
                        <GridLine>
                           <Visible>true</Visible>
                           <LineWidth>0</LineWidth>
                           <GridSpanInCM>1</GridSpanInCM>
                        </GridLine>
                     </Element>
                  </XElements>
                  <SpecifyHeight>115.5</SpecifyHeight>
               </Element>
            </XElements>
            <CompressOwnerLineSpacing>true</CompressOwnerLineSpacing>
            <Columns>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>180</InnerID>
                  <Width>125.8523</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>181</InnerID>
                  <Width>134.8523</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>182</InnerID>
                  <Width>72.6022</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>183</InnerID>
                  <Width>99.1022</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>184</InnerID>
                  <Width>132.8523</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>185</InnerID>
                  <Width>91.85232</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>186</InnerID>
                  <Width>161.8523</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>187</InnerID>
                  <Width>110.8523</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>188</InnerID>
                  <Width>124.8523</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>189</InnerID>
                  <Width>127.8523</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>190</InnerID>
                  <Width>89.85229</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>191</InnerID>
                  <Width>124.8523</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>192</InnerID>
                  <Width>96.8523</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>193</InnerID>
                  <Width>106.8523</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>194</InnerID>
                  <Width>73.00001</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>195</InnerID>
                  <Width>111.7046</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>196</InnerID>
                  <Width>108.8523</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>197</InnerID>
                  <Width>161.8523</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>198</InnerID>
                  <Width>132.8523</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>199</InnerID>
                  <Width>156.8523</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>200</InnerID>
                  <Width>372.8523</Width>
               </Element>
               <Element xsi:type="XTextTableColumn">
                  <InnerID>201</InnerID>
                  <Width>181.8523</Width>
               </Element>
            </Columns>
         </Element>
         <Element xsi:type="XParagraphFlag">
            <InnerID>996</InnerID>
         </Element>
      </XElements>
   </Element>
   <Element xsi:type="XTextFooter">
      <InnerID>291</InnerID>
      <AcceptTab>true</AcceptTab>
      <XElements>
         <Element xsi:type="XParagraphFlag">
            <InnerID>177</InnerID>
         </Element>
      </XElements>
   </Element>
</XElements>
<SerializeParameterValue>true</SerializeParameterValue>
<FileFormat>XML</FileFormat>
<ContentStyles>
   <Default xsi:type="DocumentContentStyle">
      <FontName>宋体</FontName>
      <FontSize>12</FontSize>
   </Default>
   <Styles>
      <Style Index="0">
         <FontName>宋体</FontName>
         <FontSize>12</FontSize>
         <Align>Center</Align>
      </Style>
      <Style Index="1">
         <FontName>宋体</FontName>
         <FontSize>15</FontSize>
         <Bold>true</Bold>
      </Style>
      <Style Index="2">
         <FontName>宋体</FontName>
         <FontSize>12</FontSize>
         <VerticalAlign>Middle</VerticalAlign>
         <BorderWidth>1</BorderWidth>
         <BorderLeft>true</BorderLeft>
         <BorderBottom>true</BorderBottom>
         <BorderTop>true</BorderTop>
         <BorderRight>true</BorderRight>
         <PaddingLeft>15</PaddingLeft>
         <PaddingTop>10</PaddingTop>
         <PaddingRight>12.5</PaddingRight>
         <PaddingBottom>10</PaddingBottom>
      </Style>
      <Style Index="3">
         <FontName>宋体</FontName>
         <FontSize>9</FontSize>
      </Style>
      <Style Index="4">
         <FontName>宋体</FontName>
         <FontSize>12</FontSize>
         <BorderWidth>1</BorderWidth>
         <BorderLeft>true</BorderLeft>
         <BorderBottom>true</BorderBottom>
         <BorderTop>true</BorderTop>
         <BorderRight>true</BorderRight>
         <PaddingLeft>20</PaddingLeft>
         <PaddingTop>15</PaddingTop>
      </Style>
      <Style Index="5">
         <FontName>宋体</FontName>
         <FontSize>9.5</FontSize>
         <LineSpacingStyle>Space1pt5</LineSpacingStyle>
      </Style>
      <Style Index="6">
         <FontName>宋体</FontName>
         <FontSize>9</FontSize>
         <Align>Center</Align>
      </Style>
      <Style Index="7">
         <FontName>宋体</FontName>
         <FontSize>12</FontSize>
         <BorderWidth>1</BorderWidth>
         <BorderLeft>true</BorderLeft>
         <BorderBottom>true</BorderBottom>
         <BorderTop>true</BorderTop>
         <BorderRight>true</BorderRight>
         <PaddingLeft>20</PaddingLeft>
         <PaddingTop>15</PaddingTop>
      </Style>
      <Style Index="8">
         <FontName>宋体</FontName>
         <FontSize>12</FontSize>
         <BorderWidth>1</BorderWidth>
         <BorderLeft>true</BorderLeft>
         <BorderBottom>true</BorderBottom>
         <BorderTop>true</BorderTop>
         <BorderRight>true</BorderRight>
         <PaddingLeft>20</PaddingLeft>
         <PaddingTop>15</PaddingTop>
      </Style>
   </Styles>
</ContentStyles>
<Info>
   <ShowHeaderBottomLine>False</ShowHeaderBottomLine>
   <LicenseText>都昌:都昌旗舰版（100并发）</LicenseText>
   <CreationTime>1980-01-01T00:00:00</CreationTime>
   <LastModifiedTime>2023-08-30T19:26:40.2717939+08:00</LastModifiedTime>
   <LastPrintTime>1980-01-01T00:00:00</LastPrintTime>
   <Operator>DCSoft.Writer Version:1.2015.1217.10</Operator>
   <NumOfPage>1</NumOfPage>
</Info>
<BodyText>日期 时间 意识 体
温 脉搏
/心率 呼吸 血压 血氧饱和度 吸氧 入量 出量 皮
肤
情
况 肢体活动 瞳孔
大小
左/右 瞳孔
反射
左/右 管
道
护
理 病情观察及措施 护士签名 
℃ 次/分 次/分 mmHg % L/min 名称 ml 名称 ml 颜色性状 左 右 
上下 上下 
                                       </BodyText>
<LocalConfig />
<PageSettings>
   <Landscape>true</Landscape>
   <StrictUsePageSize>false</StrictUsePageSize>
</PageSettings>
</XTextDocument>`;
