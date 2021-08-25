import React from "react";
import { monthMap } from '../app/constants/utilityData';

type inputCompType = {
    value: any,
    update: (payload: any) => void,
}

type hoverFormType = {
    active: boolean,
    submit: (payload: any) => void,
    close: () => void,
}

let InputMonth: React.FC<inputCompType> = function (props) {
    let { value, update } = props;
    let months: number[] = [];
    for (let i = value; i <= 12; i++) months.push(i);
    for (let i = 1; i < value; i++) months.push(i);

    return <select name="budget-month" className="mb-3" required
        value={value} onChange={e => update(parseInt(e.target.value))}>
        {
            months.map(k => {
                return <option value={k} key={months.indexOf(k)}>{monthMap[k]}</option>
            })
        }
    </select>
}

let InputYear: React.FC<inputCompType> = function (props) {
    let { value, update } = props;
    let yearInputOptions: number[] = [];
    let currentYear = (new Date()).getFullYear();
    for (let i = currentYear; i >= 2000; i--) yearInputOptions[currentYear - i] = i;

    return <select name="budget-year" id="budget-year" className="mb-3" required
        value={value} onChange={e => update(parseInt(e.target.value))}>
        {
            yearInputOptions.map(o => {
                return <option value={o} key={o}>{o}</option>
            })
        }
    </select>
}

let HoverForm: React.FC<hoverFormType> = function (props) {
    let { active, close, submit } = props;
    let onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        let target = e.target as HTMLElement;
        if (target.classList.contains('center-form-bg')) close();
    }
    return <div onClick={onClick} className={"center-form-bg" + (active ? "" : " invisible")}>
        <form id="budgetFormDialog" className="center-form dp04" onSubmit={submit}>
            {props.children}
        </form>
    </div>;
}

export { InputMonth, InputYear, HoverForm };