type chartData = {
    label: string,
    value: number,
};
type chartColorScheme = {
    accent1: string,
    accent2: string,
    accent3: string,
    accent4: string,
    accent5: string,
    accent6: string,
    accent7: string,
}
type chartBuilderOptions = {
    colorScheme: chartColorScheme,
};

type chartBuilderSubOptions = {
    colorScheme?: chartColorScheme,
    backgroundColor?: string,
};

let canvasUtils = {
    drawLine: function drawLine(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number){
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(endX,endY);
        ctx.stroke();
    },
    drawArc: function drawArc(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number){
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.stroke();
    },
    drawPieSlice: function drawPieSlice(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number, color: string ){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerX,centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
    }
}

let ChartBuilder = function ChartBuilder(options: chartBuilderOptions) {
    // let colors: string[] = [];
    let colorValues = Object.keys(options.colorScheme).map(key => options.colorScheme[key as keyof chartColorScheme]);

    let pieChart = function pieChart(canvas: HTMLCanvasElement, data: chartData[], legend: boolean = false, donutRad?: number, chartOptions?: chartBuilderSubOptions) {

        data = data.filter(d => d.value > 0);
        const total: number = data.map(d => d.value).reduce((p, c) => p + c);
        const ctx = canvas.getContext('2d')!;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        let radius = Math.min(centerX, centerY);
        let chartColors = colorValues;
        if (chartOptions && chartOptions.colorScheme && Object.keys(chartOptions.colorScheme).length > 0) 
            chartColors = Object.keys(chartOptions.colorScheme).map(key => chartOptions.colorScheme![key as keyof chartColorScheme]);
        const nColors = chartColors.length;
        console.log(canvas.height, canvas.width, canvas.clientHeight, canvas.clientWidth, radius);

        return {
            draw: function draw(rad?: number) {
                radius = rad || radius;
                let startAngle: number, sliceAngle: number, value: number, colorInx: number;
                startAngle = sliceAngle = value = colorInx = 0;

                for (let inx in data) {
                    value = data[inx].value;
                    sliceAngle = (value / total) * (2 * Math.PI);

                    canvasUtils.drawPieSlice(
                        ctx,
                        centerX,
                        centerY,
                        radius,
                        startAngle,
                        startAngle + sliceAngle,
                        chartColors[colorInx % nColors]
                    );

                    startAngle += sliceAngle;
                    colorInx++;
                }

                if (donutRad) {
                    let bgColor = "#000000";
                    if (chartOptions && chartOptions.backgroundColor) bgColor = chartOptions.backgroundColor;
                    console.log(bgColor);
                    canvasUtils.drawPieSlice(
                        ctx,
                        centerX,
                        centerY,
                        donutRad * Math.min(centerX/2, centerY/2),
                        0,
                        2 * Math.PI,
                        bgColor
                    );
                }
            }
        }
    }

    return {
        pieChart
    }
}

export default ChartBuilder;
export type { chartData, chartColorScheme, chartBuilderOptions };