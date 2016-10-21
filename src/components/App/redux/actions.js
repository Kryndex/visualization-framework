export const ActionTypes = {
    ACTION_MAIN_MENU_TOGGLE: "ACTION_MAIN_MENU_TOGGLE",
    ACTION_NAV_BAR_SET_TITLE: "ACTION_NAV_BAR_SET_TITLE",
};

export const ActionKeyStore = {
    MAIN_MENU_OPENED: "mainMenuOpened",
    NAV_BAR_TITLE: "title",
};


export const Actions = {
    toggleMainMenu: () => {
        return {
            type: ActionTypes.ACTION_MAIN_MENU_TOGGLE
        };
    },
    updateTitle: (aTitle) => {
        return {
            type: ActionTypes.ACTION_NAV_BAR_SET_TITLE,
            title: aTitle
        }
    },
};