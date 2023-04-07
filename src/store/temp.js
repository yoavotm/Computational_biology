export default createStore({

    state: {
      variableSearch:'',
      callTraceSelected:'',
      codeViewToggleButton: false,
      fileViewSpinnerState: [],
      fileViewSpinnerErrorState: [],
      firstTabActiveFile:'',
      secondTabActiveFile:'',
      fileViewOpen:false,
      activeFileView:'firstTab',
      fileTree:[],
      filesFirstTab:[],
      filesSecondTab:[],
      filesSecondTabOpen: false,
      filesFirstTabOpen: true,
      globalResSelected: false, 
      sideBarCollapsed: false, 
      rightSideBarCollapsed: false, 
      multiCounterModel:'',
      availableContracts:[],
      globalCallResolution:[],
      cancelApiStatus:{
        called : false,
        success : false,
        errorString:false
      },
      selectedLink: '',
      runningRules:{},
      isDev: import.meta.env.VITE_PROXY ? true : false,
      isLocal: isLocal,
      genericError: genericErrorVar,
      verificationProgress:{},
      icons:icon,
      results: [],
      isNodeSelected:false,
      selectedOutput:{'callResolution':[],
      'callResolutionWarnings':[],
     
    },
    order: {
      status:0,
      name:0,
      duration:0
    },
    orderVars: {
      name:0,
      value:0
    },
  
    jobStatusObj:{},
      isOutputSelected:false,
      isTreeLoading:false,
      treeViewPath:[],
      // thumbStyle should not be in app state
      thumbStyle: {
        right: '6px',
        borderRadius: '5px',
        backgroundColor: '#D1D3E2',
        width: '4px',
        height:'5px',
        opacity: '1'
        
      },
      jobDataObject:{},
      resultsTxtUrl:`${localPath}/output/${data.userId}/${data.jobId}/Results.txt?anonymousKey=${data.anonymousKey}`,
      jobStatusUrl:`/jobStatus/${data.userId}/${data.jobId}/?anonymousKey=${data.anonymousKey}`,
      expandedKeysState:[],
      expandedFilesState:[],
      selectedResult:{},
      selectedFile:{},
      globalCallResolutionCounter:0,
    },
    getters: {
      // variables tab search field
      variableSearch: (state) => state.variableSearch,
      // highlighted text in call trace
      callTraceSelected: (state) => state.callTraceSelected,
      // button that toggles code view on and off
      codeViewToggleButton: (state) => state.codeViewToggleButton, 
      // array of nodes that are loading
      fileViewSpinnerState: (state) => state.fileViewSpinnerState, 
      fileViewSpinnerErrorState: (state) => state.fileViewSpinnerErrorState, 
      // selected tab in the file tabs - string - matches the name of the file
      firstTabActiveFile: (state) => state.firstTabActiveFile, 
      secondTabActiveFile: (state) => state.secondTabActiveFile, 
      // both files wrapper open/closed - (width 0 | 50%) - boolean
      fileViewOpen: (state) => state.fileViewOpen, 
      // which file tab is active and gets updated with the code - string ('firstTab'|'secondTab')
      activeFileView: (state) => state.activeFileView, 
      // first/"left" tab files array
      filesFirstTab: (state) => state.filesFirstTab, 
      // second/"right" tab files array
      filesSecondTab: (state) => state.filesSecondTab, 
      // first files tab open/closed - boolean
      filesFirstTabOpen: (state) => state.filesFirstTabOpen, 
      // second files tab open/closed - boolean
      filesSecondTabOpen: (state) => state.filesSecondTabOpen, 
      // file treeView array
      fileTree: (state) => state.fileTree, 
      // left side panel call resolution selected - boolean
      globalResSelected: (state) => state.globalResSelected,
      globalCallResolutionCounter: (state) => state.globalCallResolutionCounter,
      sideBarCollapsed: (state) => state.sideBarCollapsed,
      rightSideBarCollapsed: (state) => state.rightSideBarCollapsed,
      multiCounterModel: (state) => state.multiCounterModel,
      expandedKeysState: (state) => state.expandedKeysState,
      expandedFilesState: (state) => state.expandedFilesState,
      isLocal: (state) => state.isLocal,
      availableContracts: (state) => state.availableContracts,
      globalCallResolution: (state) => state.globalCallResolution,
      cancelApiStatus: (state) => state.cancelApiStatus,
      selectedLink: (state) => state.selectedLink,
      runningRules: (state) => state.runningRules,
      isDev: (state) => state.isDev,
      genericError: (state)=> state.genericError,
      jobStatusObj: (state) => state.jobStatusObj,
      jobDataObject:(state) => state.jobDataObject,
      verificationProgress : (state) => state.verificationProgress,
      icons: (state) => state.icons,
      jobStatusUrl: (state) => state.jobStatusUrl,
      resultsTxtUrl: (state)=> state.resultsTxtUrl,
      jobData: (state)=> state.jobDataObject,
      jobDataTime:(state)=>formateDateTime(state.jobDataObject.postTime),
      jobDataTotalTime: (state) => state.jobDataTotalTime,
      thumbStyle:(state) => state.thumbStyle,
      allResults: (state) =>  state.results,    
      selectedResult: (state) => state.selectedResult,
      selectedFile: (state) => state.selectedFile,
       isNodeSelected: (state) => state.isNodeSelected,
       selectedOutput: (state) => state.selectedOutput,
       isOutputSelected: (state) => state.isOutputSelected,
       isTreeLoading: (state) => state.isTreeLoading,
       treeViewPath: (state) => state.treeViewPath,
       order: (state) => state.order,
       orderVars: (state) => state.orderVars,
    },
    mutations: {
      variableSearch: (state, str) =>(state.variableSearch = str),
      callTraceSelected: (state, str) =>(state.callTraceSelected = str),
      codeViewToggleButton: (state, bool) =>(state.codeViewToggleButton = bool),
      fileViewSpinnerState:(state, arr) =>(state.fileViewSpinnerState = arr),
      fileViewSpinnerErrorState:(state, arr) =>(state.fileViewSpinnerErrorState = arr),
      firstTabActiveFile:(state, str) =>(state.firstTabActiveFile = str),
      secondTabActiveFile:(state, str) =>(state.secondTabActiveFile = str),
      fileViewOpen:(state, bool) =>(state.fileViewOpen = bool),
      activeFileView:(state, str) =>(state.activeFileView = str),
      globalResSelected:(state, bool) =>(state.globalResSelected = bool),
      filesFirstTab:(state, arr) =>(state.filesFirstTab = arr),
      filesSecondTab:(state, arr) =>(state.filesSecondTab = arr),
      filesFirstTabOpen:(state, bool) =>(state.filesFirstTabOpen = bool),
      filesSecondTabOpen:(state, bool) =>(state.filesSecondTabOpen = bool),
      fileTree:(state, arr) =>(state.fileTree = arr),
      globalCallResolutionCounter:(state, int) =>(state.globalCallResolutionCounter = int),
      sideBarCollapsed:(state, bool) =>(state.sideBarCollapsed = bool),
      rightSideBarCollapsed:(state, bool) =>(state.rightSideBarCollapsed = bool),
      multiCounterModel:(state, obj)=>(state.multiCounterModel = obj),
      expandedKeysState:(state, arr) => (state.expandedKeysState = arr),
      expandedFilesState:(state, arr) => (state.expandedFilesState = arr),
      availableContracts: (state, obj) => (state.availableContracts = obj),
      globalCallResolution: (state, obj) => (state.globalCallResolution = obj),
      cancelApiStatus: (state, obj) => (state.cancelApiStatus = obj),
      jobDataTotalTime:(state, obj) => (state.jobDataTotalTime = obj),
      selectedLink:(state, str) =>(state.selectedLink = str),
      runningRules:(state , obj) => (state.runningRules = obj),
      genericError:(state , bool) => (state.genericError = bool),
      jobStatusObj: (state, obj) => (state.jobStatusObj = obj),
      setResults: (state , results) =>(state.results = results),
      selectedResult: (state , key )=> (state.selectedResult = key, state.isNodeSelected= true),
      selectedFile: (state , key )=> (state.selectedFile = key),
      selectedOutput: (state , file )=> (state.selectedOutput = file, state.isOutputSelected = true, state.isTreeLoading =false),
      isTreeLoading: (state , bool )=> (state.isTreeLoading = bool),
      treeViewPath:(state, path) => (state.treeViewPath = path),
      verificationProgress:(state, verificationProgress) => (state.verificationProgress = verificationProgress),
      jobDataObject:(state ,obj) => (state.jobDataObject = obj),
      order:(state, obj) => (state.order[obj.property] =  obj.num),
      orderVars:(state, obj) => (state.orderVars[obj.property] =  obj.num),
    },
    
    actions: {
      updateSideBarCollapsed({commit}, bool){
        commit('sideBarCollapsed', bool)
      },
      updateRightSideBarCollapsed({commit}, bool){
        commit('rightSideBarCollapsed', bool)
      },
    }
     
  });