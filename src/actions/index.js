import instance from '../utils/instance';
import web3 from '../utils/web3';

export const setDefaultAccount = (defaultAccount) => {
    return { type: 'SET_DEFAULT_ACCOUNT', payload: { defaultAccount } }
}

export const fetchTenderFactoryManager = () => async (dispatch) => {
    const tenderFactory = await instance('TenderFactory');
    const manager = await tenderFactory.manager();

    dispatch({ type: 'FETCH_FACTORY_MANAGER', payload: manager });
}

export const fetchTenders = () => async (dispatch) => {
    const tenderFactory = await instance('TenderFactory');
    const tenders = await tenderFactory.getAllTenders();

    dispatch({ type: 'FETCH_TENDERS', payload: { tenders } });
}

export const fetchTenderDetails = (at) => async (dispatch) => {
    const tender = await instance('Tender', at);
    const details = await tender.getAllDetails();

    dispatch({
        type: 'FETCH_TENDER_DETAILS',
        payload: {
            manager: details[0],
            tenderPassed: details[1],
            biddingEndTime: details[2].toNumber(),
            name: details[3]
        }
    });
}

export const fetchProposals = (at) => async (dispatch) => {
    const tender = await instance('Tender', at);
    const proposals = await tender.getAllProposals();

    dispatch({ type: 'FETCH_ALL_PROPOSAL', payload: { proposals } });
}

export const placeBid = (at) => async (dispatch, getState) => {
    const tender = await instance('Tender', at);
    const { accounts, form } = getState();
    const { amount, stages } = form.placeBid.values;
    await tender.placeBid(web3.utils.toWei(amount), stages, { from: accounts.defaultAccount });

    dispatch(fetchProposals(at));
}

export const fetchTenderPassedDetails = (at) => async (dispatch) => {
    const tenderPassed = await instance('TenderPassed', at);
    const details = await tenderPassed.getAllDetails();

    dispatch({
        type: 'FETCH_TENDER_PASSED_DETAILS',
        payload: {
            manager: details[0],
            projectDeveloper: details[1],
            projectCost: details[2],
            amountClaimable: details[3],
            amountReleased: details[4],
            stagesRemaining: details[5].toString(),
            completed: details[6]
        }
    });
}

export const fetchTenderStages = (at) => async (dispatch) => {
    const tenderPassed = await instance('TenderPassed', at);
    const stages = await tenderPassed.getAllStages();

    dispatch({ type: 'FETCH_ALL_STAGES', payload: { stages } });
}

export const stageRequest = (at) => async (dispatch, getState) => {
    const tenderPassed = await instance('TenderPassed', at);
    const { accounts, form } = getState();
    const { name, amount } = form.stageForm.values; 
    await tenderPassed.raiseStageRequest(name, web3.utils.toWei(amount, 'ether'), { from: accounts.defaultAccount });

    dispatch(fetchTenderStages(at));
    dispatch(fetchTenderPassedDetails(at));
}

export const grantStage = (at, index) => async (dispatch, getState) => {
    const tenderPassed = await instance('TenderPassed', at);
    const { accounts, tenderPassed: tenderPassedState } = getState();
    await tenderPassed.grantStageRequest(index, {
        from: accounts.defaultAccount,
        value: tenderPassedState.stages[index].amount
    });

    dispatch(fetchTenderStages(at));
    dispatch(fetchTenderPassedDetails(at));
}