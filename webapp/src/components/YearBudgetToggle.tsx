import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { yearBudgetType } from "../utilities/types";
import IconButton from "./IconButton";

let YearBudgetToggle: React.FC<{
    budgets: yearBudgetType[],
    onAddClick: () => void
}> = function YearBudgetToggle(props) {
    if (props.budgets.length === 0) {
        return <div className="year-toggle">
            <IconButton icon={faPlus} btnText={'Add Year Budget'} iconPosition={'left'} onClick={e => props.onAddClick()} elevated />
        </div>;
    }
    return <div className="year-toggle"></div>
}

export default YearBudgetToggle;