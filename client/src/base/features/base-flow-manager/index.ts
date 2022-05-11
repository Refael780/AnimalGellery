import CreateFlowManager, { parseSubFlowsJSON } from 'redux-flow-manager';
import subFlowsConfig from 'public/config/flow-manager/sub.flows.config.json';
import flowsConfig from 'public/config/flow-manager/flows.config.json';

export default (Store: any) =>
	CreateFlowManager(Store, 'flowManager', parseSubFlowsJSON(subFlowsConfig, {}), flowsConfig);
