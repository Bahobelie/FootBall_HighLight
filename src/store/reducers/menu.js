


// initial state
const initialState = {
    openItem:['dashboard'],
    defaultId:'dashboard',
    openComponent:'button',
    drawerOpen:false,
    componentDrawerOpen:false,
};
const mainReducer=(state=initialState, action)=>{
    switch(action.type){
        case 'activeItem':
            return{
                ...state,
                openItem:action.payload.openItem,
            };
            case 'activeComponent':
                return {
                    ...state,
                    openComponent:action.payload.openComponent,
                };
                case 'openDrawer':
                    return {
                        ...state,
                        drawerOpen:action.payload.drawerOpen,
                    };
                    case 'openComponentDrawer':
                        return {
                            ...state,
                            componentDrawerOpen:action.payload.componentDrawerOpen,
                        };
        default:
            return state;
    }
}
export default mainReducer;