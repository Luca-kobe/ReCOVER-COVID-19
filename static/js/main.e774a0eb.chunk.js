(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{414:function(e,t,a){},487:function(e,t,a){e.exports=a(758)},492:function(e,t,a){},659:function(e,t,a){},746:function(e,t,a){},749:function(e,t,a){},758:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(37),s=a.n(i),c=(a(492),a(41)),o=a(40),l=a(89),u=a(88),d=(a(343),a(207)),h=(a(344),a(149)),m=(a(494),a(448)),p=(a(496),a(153)),f=(a(498),a(447)),v=(a(500),a(274)),g=(a(502),a(444)),y=(a(505),a(186)),b=(a(507),a(445)),S=(a(283),a(133)),E=a(201),k=a(202),D=a(212),O=a(92),C=(a(759),a(271)),w=a(77),j=a(415),x=a(216),A=a.n(x),M=a(332),I=a.n(M),N=a(136);var P=function(e){var t=e.series,a=e.lineGenerator,n=e.xScale,i=e.yScale;return t.map((function(e){var t=e.id,s=e.data,c=e.color,o=e.predicted,l=e.distancing,u={strokeWidth:3};return o&&(u.strokeDasharray=l?"6, 4":"2, 6"),r.a.createElement("path",{key:t,d:a(s.map((function(e){return{x:n(e.data.x),y:i(e.data.y)}}))),fill:"none",stroke:c,style:u})}))},R={axis:{ticks:{text:{fontSize:18}},legend:{text:{fontSize:18}}},legends:{text:{fontSize:18}}},V=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"parseDate",value:function(e){var t=e.split("-").map(Number),a=Object(w.a)(t,3),n=a[0],r=a[1],i=a[2];return new Date(n,r-=1,i)}},{key:"getCumulativeData",value:function(e){var t=this;return e.map((function(e){return{x:t.parseDate(e.date),y:e.value}}))}},{key:"getDeltaData",value:function(e,t){var a=this;return e.map((function(n,r){return 0===r?{x:a.parseDate(n.date),y:n.value-t}:{x:a.parseDate(n.date),y:n.value-e[r-1].value}}))}},{key:"processData",value:function(e,t){var a=t.statistic,n=t.yScale,r=t.initialVal,i="delta"===a?this.getDeltaData(e,r):this.getCumulativeData(e);return"log"===n&&(i=i.filter((function(e){e.x;return e.y>0}))),i}},{key:"getDataMax",value:function(){var e=this.props.data,t=0;return Object.keys(e).forEach((function(a){var n=e[a],r=n.observed,i=n.predictions;t=Math.max(t,Math.max.apply(Math,Object(D.a)(r.map((function(e){return e.value}))))),i.forEach((function(e){var a=e.time_series;t=Math.max(t,Math.max.apply(Math,Object(D.a)(a.map((function(e){return e.value})))))}))})),t}},{key:"getYAxisProps",value:function(){for(var e=this.props,t=e.statistic,a=e.yScale,n={format:function(e){return I()(e).format("0.[0]a")},orient:"left",tickSize:5,tickPadding:5,tickRotation:0,legend:"delta"===t?"New Cases":"Cumulative Cases",legendOffset:-60,legendPosition:"middle"},r=[],i=0;i<=Math.ceil(Math.log10(this.getDataMax()));i++)r.push(Math.pow(10,i));var s=Object(k.a)({},n,{tickValues:r});return"log"===a?{axisLeft:s,gridYValues:r,yScale:{type:"log",base:10,min:Math.min.apply(Math,r),max:Math.max.apply(Math,r)}}:{axisLeft:n,yScale:{type:"linear",min:"auto",max:"auto"}}}},{key:"render",value:function(){var e=this,t=this.props.data,a=this.props,n=a.statistic,i=a.yScale,s=[],c=[];Object.keys(t).sort().forEach((function(a,r){var o=function(e){var t=[N.red.primary,N.gold.primary,N.lime.primary,N.cyan.primary,N.geekblue.primary,N.purple.primary,N.magenta.primary];return t[e%t.length]}(r),l=t[a].observed;s.push({id:a,data:e.processData(l,{statistic:n,yScale:i,initialVal:0}),predicted:!1}),c.push(o),t[a].predictions.filter((function(e){return e.time_series.length>0})).forEach((function(t){t.model.name;var r=t.distancing,u=t.time_series;s.push({id:"".concat(a," (").concat(t.model.name,", distancing=").concat(r,")"),data:e.processData(u,{statistic:n,yScale:i,initialVal:l[l.length-1].value}),predicted:!0,distancing:r}),c.push(o)}))}));var o="every week";if(s.length>0){var l=s[0].data[0].x,u=s[0].data[0].x;s.forEach((function(e){e.data.forEach((function(e){var t=e.x;l=Math.min(l,t),u=Math.max(u,t)}))})),l=A()(l),(u=A()(u)).diff(l,"days")>150&&(o="every month")}return r.a.createElement(j.a,Object.assign({data:s,colors:c,margin:{top:10,right:50,bottom:70,left:100},xScale:{type:"time",format:"native",precision:"day"},axisBottom:{tickValues:o,format:function(e){return A()(e).format("M/D")},orient:"bottom",tickSize:5,tickPadding:5,tickRotation:0,legend:"Date",legendOffset:36,legendPosition:"middle"}},this.getYAxisProps(),{enableSlices:"x",sliceTooltip:function(e){var t=e.slice;return r.a.createElement("div",{style:{background:"white",padding:"9px 12px",border:"1px solid #ccc"}},r.a.createElement("div",null,A()(t.points[0].data.x).format("MMM Do YYYY")),t.points.map((function(e){return r.a.createElement("div",{key:e.id,style:{color:e.serieColor,padding:"3px 0"}},r.a.createElement("strong",null,e.serieId),"[",I()(e.data.yFormatted).format("0.[0]a"),"]")})))},pointSize:0,pointLabel:"y",pointLabelYOffset:-12,legends:[{anchor:"top-left",direction:"column",justify:!1,translateX:0,translateY:0,itemsSpacing:0,itemDirection:"left-to-right",itemWidth:80,itemHeight:20,itemOpacity:.75,symbolSize:12,symbolShape:"circle",symbolBorderColor:"rgba(0, 0, 0, .5)",effects:[{on:"hover",style:{itemBackground:"rgba(0, 0, 0, .03)",itemOpacity:1}}]}],layers:["grid","markers","areas","crosshair",P,"slices","points","axes","legends"],theme:R}))}}]),a}(n.Component),T=a(152),_=a.n(T),F="https://dslab-covid19-backend.herokuapp.com/api",L=function(){function e(){Object(c.a)(this,e)}return Object(o.a)(e,[{key:"affected_by",value:function(e){}},{key:"areas",value:function(e){var t="".concat(F,"/areas");_.a.get(t).then((function(t){var a=t.data;e(a)}))}},{key:"models",value:function(e){var t="".concat(F,"/models");_.a.get(t).then((function(t){var a=t.data;e(a)}))}},{key:"cumulative_infections",value:function(e){var t="".concat(F,"/cumulative_infections");_.a.get(t).then((function(t){return e(t.data)}))}},{key:"predict_all",value:function(e,t){var a="".concat(F,"/predict_all");_.a.get(a,{params:e}).then((function(e){return t(e.data)}))}},{key:"predict",value:function(e,t){var a="".concat(F,"/predict");_.a.get(a,{params:e}).then((function(e){t(e.data)}))}},{key:"getCurrentDate",value:function(e){var t="".concat(F,"/current_date");_.a.get(t).then((function(t){var a=t.data;e(a)}))}}]),e}();function B(e){return"".concat(e.country).concat(e.state?" / "+e.state:"")}var G=a(95),z=a(217),Y=a(333),U=a(334),W=a(428),q=a(429),H=a(430),J=a(449);G.e(J.a);var K=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).onShowState=function(t){e.setState({showState:t})},e.modelAPI=new L,e.state={areasList:[],showState:!1},e.modelAPI.areas((function(t){return e.setState({areasList:t})})),e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.props.triggerRef(this),this.fetchData(this.props.dynamicMapOn)}},{key:"fetchData",value:function(e){var t=this;e&&""!==this.props.model?"cumulative"===this.props.statistic?this.modelAPI.predict_all({days:this.props.days,model:this.props.model},(function(e){console.log(e);var a=e.map((function(e){return{id:e.area.iso_2,value:e.value>0?Math.log(e.value):0,valueTrue:e.value,area:e.area}}));t.setState({heatmapData:a},t.resetChart)})):this.modelAPI.predict_all({days:this.props.days,model:this.props.model},(function(e){t.modelAPI.predict_all({days:t.props.days-1,model:t.props.model},(function(a){var n=e.map((function(e,t){return{id:e.area.iso_2,value:e.value-a[t].value>0?Math.log(e.value-a[t].value):0,valueTrue:e.value-a[t].value,area:e.area}}));t.setState({heatmapData:n},t.resetChart)}))})):this.modelAPI.cumulative_infections((function(e){console.log(e);var a=e.map((function(e){return{id:e.area.iso_2,value:e.value>0?Math.log(e.value):0,valueTrue:e.value,area:e.area}}));t.setState({heatmapData:a},t.createChart)}))}},{key:"initChart",value:function(){this.chart=G.d("chartdiv",z.a),this.chart.projection=new z.d.Mercator}},{key:"createChartSeries",value:function(e){var t=this.props.statistic,a=this.chart.series.push(new z.b),n=(a=Object.assign(a,e)).mapPolygons.template;"cumulative"===t?a.heatRules.push({property:"fill",target:n,min:G.c("#fcbba0"),max:G.c("#66000d"),minValue:0,maxValue:Math.log(5e6)}):a.heatRules.push({property:"fill",target:n,min:G.c("#fcbba0"),max:G.c("#66000d"),minValue:0,maxValue:Math.log(1e6)}),n.tooltipText="{name}: {valueTrue}",n.nonScalingStroke=!0,n.strokeWidth=.5,n.states.create("hover").properties.fill=G.c("#e43027"),n.cursorOverStyle=G.b.pointer;var r=this.props,i=r.onMapClick,s=r.onNoData;return n.events.on("hit",(function(e){var t=e.target.dataItem.dataContext,a=(t.id,t.value,t.area),n=t.name;a?i(a):s(n)})),a}},{key:"initChartInterface",value:function(){var e=this;this.chart.zoomControl=new z.c,this.chart.zoomControl.cursorOverStyle=G.b.pointer;var t=this.chart.chartContainer.createChild(G.a);t.label.text="Show States/Provinces",t.togglable=!0,t.padding(5,5,5,5),t.align="right",t.marginRight=15,t.cursorOverStyle=G.b.pointer,t.events.on("hit",(function(){e.onShowState(t.isActive);var a=e.state.showState;e.stateSeries.forEach((function(e){return e.disabled=!a})),t.label.text="".concat(a?"Hide":"Show"," States/Provinces")}))}},{key:"createChart",value:function(){var e=this.state.heatmapData;this.initChart();this.createChartSeries({geodata:Y.a,exclude:["AQ"],data:e});var t=this.createChartSeries({geodata:W.a,data:e,disabled:!this.state.showState}),a=this.createChartSeries({geodata:U.a,data:e,disabled:!this.state.showState}),n=this.createChartSeries({geodata:q.a,data:e,disabled:!this.state.showState}),r=this.createChartSeries({geodata:H.a,data:e,disabled:!this.state.showState});this.stateSeries=[t,a,n,r],this.initChartInterface()}},{key:"resetChart",value:function(){var e=this.state.heatmapData,t=(this.createChartSeries({geodata:Y.a,exclude:["AQ"],data:e}),this.createChartSeries({geodata:U.a,data:e,disabled:!this.state.showState}));this.stateSeries=[t]}},{key:"componentWillUnmount",value:function(){this.chart&&this.chart.dispose()}},{key:"render",value:function(){return r.a.createElement("div",{id:"chartdiv"})}}]),a}(n.Component),X=(a(659),C.a.Option),Q=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).handleYScaleSelect=function(e){n.setState({yScale:e.target.value})},n.handleStatisticSelect=function(e){n.setState({statistic:e.target.value},(function(){n.reloadAll()}))},n.componentWillMount=function(){n.addAreaByStr("US"),n.formRef=r.a.createRef(),n.modelAPI=new L,n.modelAPI.areas((function(e){return n.setState({areasList:e})})),n.modelAPI.models((function(e){return n.setState({modelsList:e})})),n.modelAPI.getCurrentDate((function(e){return n.setState({currentDate:e[0].date})}))},n.bindRef=function(e){n.map=e},n.onAlertClose=function(){n.setState({noDataError:!1})},n.onNoData=function(e){n.setState({noDataError:!0,errorDescription:"There is currently no data for ".concat(e)})},n.generateMarks=function(){var e=n.state.currentDate,t=new Date("".concat(e,"T00:00")),a={};a[0]="".concat(t.getMonth()+1,"/").concat(t.getDate());for(var r=7;r<99;r+=7)t.setDate(t.getDate()+7),a[r]="".concat(t.getMonth()+1,"/").concat(t.getDate());return a},n.state={areas:n.props.areas||[],areasList:[],models:n.props.models||["No under-reported cases(default)"],modelsList:[],currentDate:"",distancingOn:!0,distancingOff:!1,mainGraphData:{},days:10,dynamicMapOn:!1,statistic:"cumulative",yScale:"linear",noDataError:!1,errorDescription:""},n.addAreaByStr=n.addAreaByStr.bind(Object(O.a)(n)),n.removeAreaByStr=n.removeAreaByStr.bind(Object(O.a)(n)),n.onValuesChange=n.onValuesChange.bind(Object(O.a)(n)),n.onMapClick=n.onMapClick.bind(Object(O.a)(n)),n.onDaysToPredictChange=n.onDaysToPredictChange.bind(Object(O.a)(n)),n.switchDynamicMap=n.switchDynamicMap.bind(Object(O.a)(n)),n.onAlertClose=n.onAlertClose.bind(Object(O.a)(n)),n.onNoData=n.onNoData.bind(Object(O.a)(n)),n.generateMarks=n.generateMarks.bind(Object(O.a)(n)),n}return Object(o.a)(a,[{key:"onMapClick",value:function(e){this.areaIsSelected(e)||this.addAreaByStr(B(e))}},{key:"areaIsSelected",value:function(e){if(this.state.areas&&e){var t=B(e);return this.state.areas.includes(t)}return!1}},{key:"addAreaByStr",value:function(e){var t=this,a=function(e){var t=e.split("/");return{country:t[0].trim(),state:2===t.length?t[1].trim():""}}(e);this.setState((function(t){return{areas:[].concat(Object(D.a)(t.areas),[e])}}),(function(){t.modelAPI.predict({state:a.state,country:a.country,models:t.state.models,days:t.state.days,distancingOn:t.state.distancingOn,distancingOff:t.state.distancingOff},(function(a){t.setState((function(t){return{mainGraphData:Object(k.a)({},t.mainGraphData,Object(E.a)({},e,a))}}))})),t.formRef.current.setFieldsValue({areas:t.state.areas})}))}},{key:"removeAreaByStr",value:function(e){this.setState((function(t){return{areas:t.areas.filter((function(t){return t!==e})),mainGraphData:Object.keys(t.mainGraphData).filter((function(t){return t!==e})).reduce((function(e,a){return Object(k.a)({},e,Object(E.a)({},a,t.mainGraphData[a]))}),{})}}))}},{key:"modelIsSelected",value:function(e){if(this.state.models&&e){var t="".concat(e.name);return this.state.models.includes(t)}return!1}},{key:"onValuesChange",value:function(e,t){var a=this;if("socialDistancing"in e||"models"in e)this.setState({models:t.models,distancingOn:t.socialDistancing.includes("distancingOn"),distancingOff:t.socialDistancing.includes("distancingOff")},(function(){a.reloadAll()}));else{var n=this.state.areas,r=t.areas,i=r.filter((function(e){return!n.includes(e)})),s=n.filter((function(e){return!r.includes(e)}));i.forEach(this.addAreaByStr),s.forEach(this.removeAreaByStr)}}},{key:"onDaysToPredictChange",value:function(e){var t=this;this.state.areas;this.setState({days:e},(function(){t.reloadAll()}))}},{key:"reloadAll",value:function(){var e=this,t=this.state.areas;this.setState({areas:[],mainGraphData:{}},(function(){t.forEach(e.addAreaByStr),e.state.dynamicMapOn&&0!==e.state.models.length&&e.map.fetchData(e.state.dynamicMapOn)}))}},{key:"switchDynamicMap",value:function(e){this.setState({dynamicMapOn:e}),this.map.fetchData(e)}},{key:"render",value:function(){var e=this,t=this.state,a=t.areas,n=t.areasList,i=t.models,s=t.modelsList,c=t.days,o=t.mainGraphData,l=(t.dynamicMapOn,t.statistic),u=t.yScale,E=t.noDataError,k=t.errorDescription,D=this.generateMarks(),O=n.filter((function(t){return!e.areaIsSelected(t)})).map(B).sort().map((function(e){return r.a.createElement(X,{key:e}," ",e," ")})),w=s.filter((function(t){return!e.modelIsSelected(t)})).map((function(e){return r.a.createElement(X,{key:e.name},r.a.createElement(S.a,{title:e.description,placement:"right"},e.name))})),j=r.a.createElement("p",null,'The trend until March 18th has been used as a proxy for "Social distancing off". ',r.a.createElement("br",null),"For modeling details, please see:",r.a.createElement("a",{href:"https://arxiv.org/abs/2004.11372"}," https://arxiv.org/abs/2004.11372"),".");return r.a.createElement("div",{className:"covid-19-predict"},r.a.createElement(d.a,{type:"flex",justify:"space-around",align:"middle"},r.a.createElement(h.a,{span:12},E?r.a.createElement(b.a,{message:"".concat(k),description:"Please wait for our updates.",type:"error",closable:!0,onClose:this.onAlertClose}):null,r.a.createElement("div",{className:"form-wrapper"},r.a.createElement(y.a,{ref:this.formRef,onValuesChange:this.onValuesChange,initialValues:{areas:a,models:i,days:10,socialDistancing:["distancingOn"]}},r.a.createElement(y.a.Item,{label:"Areas",name:"areas",rules:[{required:!0,message:"Please select areas!"}]},r.a.createElement(C.a,{mode:"multiple",style:{width:"100%"},placeholder:"Select Areas"},O)),r.a.createElement(y.a.Item,{label:"Under-reporting Cases:",name:"models",rules:[{required:!0,message:"Please select reporting ratio!"}]},r.a.createElement(C.a,{mode:"multiple",style:{width:"100%"},placeholder:"Select Reporting Ratio",defaultValue:["No under-reported cases(default)"]},w)),r.a.createElement(y.a.Item,{label:"Date to Predict",name:"days",rules:[{required:!0,message:"Please select number of days!"}]},r.a.createElement(g.a,{marks:D,min:1,initialValue:10,max:99,step:7,onAfterChange:this.onDaysToPredictChange})),r.a.createElement(f.a,{content:j,title:"Social Distancing Clarification",placement:"topLeft"},r.a.createElement(y.a.Item,{label:"Social Distancing",name:"socialDistancing"},r.a.createElement(v.a.Group,null,r.a.createElement(v.a,{defaultChecked:!0,value:"distancingOn"},"Current Trend"),r.a.createElement(v.a,{value:"distancingOff"},"Social Distancing Off"))))),r.a.createElement("div",null,"Statistic:\xa0\xa0",r.a.createElement(p.a.Group,{value:l,onChange:this.handleStatisticSelect},r.a.createElement(p.a,{value:"cumulative"},"Cumulative Cases"),r.a.createElement(p.a,{value:"delta"},"New Cases"))),r.a.createElement("br",null),r.a.createElement("div",null,"Scale:\xa0\xa0",r.a.createElement(p.a.Group,{value:u,onChange:this.handleYScaleSelect},r.a.createElement(p.a,{value:"linear"},"linear"),r.a.createElement(p.a,{value:"log"},"logarithmic"))),r.a.createElement("br",null),r.a.createElement("p",null,"Dynamic Map:\xa0\xa0",r.a.createElement(m.a,{onChange:this.switchDynamicMap})))),r.a.createElement(h.a,{span:12},r.a.createElement("div",{className:"map-wrapper"},r.a.createElement(K,{className:"map",triggerRef:this.bindRef,dynamicMapOn:this.state.dynamicMapOn,days:c,model:null==this.state.models||0===this.state.models.length?"":this.state.models[this.state.models.length-1],onMapClick:this.onMapClick,onNoData:this.onNoData,statistic:l})))),a.length?r.a.createElement(d.a,null,r.a.createElement(h.a,{span:24},r.a.createElement("div",{className:"graph-wrapper"},r.a.createElement(V,{data:o,statistic:l,yScale:u})))):null)}}]),a}(n.PureComponent),$=(a(746),a(414),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"page-wrapper"},r.a.createElement("div",{className:"article"},r.a.createElement("h1",{className:"article-title"},"ReCOVER: Accurate Predictions and Resource Management for COVID-19 Epidemic Response"),r.a.createElement("p",{className:"article-paragraph"},"Accurate forecasts of COVID-19 is central to resource management and building strategies to deal with the epidemic. This is a NSF-funded project on COVID-19 forecasting directed by Viktor K. Prasanna (",r.a.createElement("a",{className:"article-anchor",href:"mailto:prasanna@usc.edu"},"prasanna@usc.edu"),") and Ajitesh Srivastava (",r.a.createElement("a",{className:"article-anchor",href:"mailto:ajiteshs@usc.edu"},"ajiteshs@usc.edu"),") from the Data Science Lab in the University of Southern California."),r.a.createElement("h2",null,"Our Model"),r.a.createElement("p",{className:"article-paragraph"},"We use our own epidemic model called SI-kJalpha -- Heterogeneous Infection Rate with Human Mobility, which is a preliminary version of what we have successfully used during ",r.a.createElement("a",{className:"article-anchor",href:"https://news.usc.edu/83180/usc-engineers-earn-national-recognition-for-predicting-disease-outbreaks/",target:"_blank"},"DARPA Grand Challenge 2014"),". By linearizing the model and using weighted least squares, our model is able to quickly adapt to changing trends and provide extremely accurate predictions of confirmed cases at the level of countries and states of the United States. Training the model to forecast also enables learning characteristics of the epidemic. In particular, we have shown that changes in model parameters over time can help us quantify how well a state or a country has responded to the epidemic. The variations in parameters also allow us to forecast different scenarios such as what would happen if we were to disregard social distancing suggestions. This work is supported by National Science Foundation Award No. 2027007 (RAPID)"),r.a.createElement("p",{className:"article-paragraph"},"Details of our initial approach can be found in our ",r.a.createElement("a",{className:"article-anchor",href:"https://www.youtube.com/watch?v=ll6k8wlxOFo",target:"_blank"},"webinar"),"."),r.a.createElement("p",{className:"article-paragraph"},"The Github repository for this project is ",r.a.createElement("a",{className:"article-anchor",href:"https://github.com/scc-usc/ReCOVER-COVID-19",target:"_blank"},"publicly available")," ."),r.a.createElement("p",{className:"article-paragraph"},"The matlab code for forecasting is also made available on ",r.a.createElement("a",{className:"article-anchor",href:"https://www.mathworks.com/matlabcentral/fileexchange/75281-recover",target:"_blank"},"File Exchange"),"."),r.a.createElement("p",{className:"article-paragraph"},"The code of the prediction model and this web application is contributed by Ajitesh Srivastava, Jamin Chen, and Frost Tianjian Xu."),r.a.createElement("h2",null,"USC Data Science Lab"),r.a.createElement("p",{className:"article-paragraph"},"The USC Data Science Lab focuses on applying machine learning, data mining, and network analysis to real-world problems in society and industry. Please find more information and other research projects ",r.a.createElement("a",{className:"article-anchor",href:"https://sites.usc.edu/dslab/",target:"_blank"}," on our website"),"."),r.a.createElement("h2",null,"Related Publications"),r.a.createElement("p",{className:"disclaimer"},r.a.createElement("b",null,"Disclaimer:")," The following papers may have copyright restrictions. Downloads will have to adhere to these restrictions. They may not be reposted without explicit permission from the copyright holder. Any opinions, findings, and conclusions or recommendations expressed in these materials are those of the author(s) and do not necessarily reflect the views of the sponsors including National Science Foundation (NSF), Defense Advanced Research Projects Agency (DARPA), and any other sponsors listed in the publications."),r.a.createElement("ol",{className:"article-paragraph"},r.a.createElement("li",null,"Ajitesh Srivastava and Viktor K. Prasanna,",r.a.createElement("a",{className:"article-anchor",href:"https://arxiv.org/abs/2004.11372",target:"_blank"}," \u201cLearning to Forecast and Forecasting to Learn from the COVID-19 Pandemic\u201d")," [arXiv]."))))}}]),a}(n.Component)),Z=a(446),ee=a(51),te=(a(747),a(272)),ae=(a(749),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).handleItemClick=function(e){var t=n.props,a=t.redirectForecast,r=(t.redirectInstruction,t.redirectAbout),i=e.key;n.setState({activeItem:e.key}),"forecast"===i?a():"information"===i&&r()},n.state={activateItem:"forecast"},n}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement(d.a,{className:"navbar-container"},r.a.createElement(h.a,null,r.a.createElement("img",{className:"logo",src:"https://identity.usc.edu/files/2011/12/combo_gold_white_cardinal.png",alt:"USC"})),r.a.createElement(h.a,null,r.a.createElement(te.a,{theme:"light",mode:"horizontal",onClick:this.handleItemClick,defaultSelectedKeys:["forecast"]},r.a.createElement(te.a.Item,{key:"forecast"},"COVID-19 Forecast"),r.a.createElement(te.a.Item,{key:"information"},"About Us"))))}}]),a}(n.Component)),ne=(a(756),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).redirectForecast=function(){n.setState({redirectForecast:!0,redirectAbout:!1})},n.redirectAbout=function(){n.setState({redirectForecast:!1,redirectAbout:!0})},n.redirectReset=function(){n.setState({redirectForecast:!1,redirectAbout:!1})},n.state={redirectForecast:!1,redirectAbout:!1},n}return Object(o.a)(a,[{key:"render",value:function(){var e=this.state,t=e.redirectForecast,a=e.redirectAbout;return r.a.createElement(Z.a,null,t?r.a.createElement(ee.a,{to:"/ReCOVER-COVID-19"}):null,a?r.a.createElement(ee.a,{to:"/ReCOVER-COVID-19/about"}):null,r.a.createElement(ae,{redirectForecast:this.redirectForecast,redirectAbout:this.redirectAbout,redirectReset:this.redirectReset}),r.a.createElement(ee.d,null,r.a.createElement(ee.b,{exact:!0,path:"/ReCOVER-COVID-19",render:function(e){return r.a.createElement(Q,e)}}),r.a.createElement(ee.b,{exact:!0,path:"/ReCOVER-COVID-19/about",render:function(e){return r.a.createElement($,e)}})))}}]),a}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(ne,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[487,1,3]]]);
//# sourceMappingURL=main.e774a0eb.chunk.js.map