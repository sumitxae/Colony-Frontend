export const isRootUser = (colony, user) => {
    if (!colony || !user) return false;
    return colony.rootUsers.some((rootUsers) => rootUsers._id === user._id);
};
