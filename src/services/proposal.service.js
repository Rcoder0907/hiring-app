import requestWithToken from "../apiConfigs/requestWithToken";

export const fetchProposal = (proposalUuid) => {
    return requestWithToken({
        url: `/proposal/public/${proposalUuid}`,
        method: 'GET'
    });
}

export const saveProposalStatus = (proposalUuid, data) => {
    return requestWithToken({
        url: `/proposal/public/${proposalUuid}`,
        method: 'PATCH',
        data,
    });
}
