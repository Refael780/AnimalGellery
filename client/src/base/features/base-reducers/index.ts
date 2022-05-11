import { reducer as form } from 'redux-form';
import { flowManagerReducer, MultipleFlowManagerState, FlowManagerState } from 'redux-flow-manager';
import { localizeReducer } from 'react-localize-redux';
import { pendingTasksReducer } from 'react-redux-spinner';
import errorHandlerReducer from '@base/features/base-error-handler/reducer';
import rbaReducer from '@base/features/base-rba/reducer';
import globalSpinnerReducer, { GlobalSpinnerState } from '@base/features/base-global-spinner/reducer';
import { RBAState } from '@base/features/base-rba/interfaces';
import { ErrorHandlerRequest } from '@base/features/base-error-handler';
import { FilterState, reducer as baseFilterReducer } from '@base/features/base-filter';

export interface BaseApplicationState {
	localize: any;
	form: any;
	errorHandler: ErrorHandlerRequest<any>;
	pendingTasks: any;
	rba: RBAState;
	globalSpinner: GlobalSpinnerState;
	flowManager: MultipleFlowManagerState | FlowManagerState;
	filters: FilterState;
}

export default {
	form,
	localize: localizeReducer,
	errorHandler: errorHandlerReducer,
	pendingTasks: pendingTasksReducer,
	rba: rbaReducer,
	globalSpinner: globalSpinnerReducer,
	flowManager: flowManagerReducer,
	filters: baseFilterReducer,
};
