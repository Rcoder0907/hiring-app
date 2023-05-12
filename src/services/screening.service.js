import requestWithToken from "../apiConfigs/requestWithToken";

export const fetchCandidateScreeningProfile = (screeningUuid) => {
    return requestWithToken({
      url: `/screening/candidate/${screeningUuid}`,
      method: 'GET'
    });
  }

export const saveCandidateScreeningProfile = (screeningUuid, data) => {
  return requestWithToken({
    url: `/screening/candidate/${screeningUuid}`,
    method: 'PATCH',
    data,
  });
}