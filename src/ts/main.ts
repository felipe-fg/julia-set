import Complex from "./complex";
import Julia from "./julia";
import Utils from "./utils";

// Fractal
const c = new Complex(0.285, 0.01);
const iterations = 1000;
const width = 1024;
const height = Math.floor((width * 2) / 3);

const data = Julia.build(c, iterations, width, height);

// Colors
const color1 = "039be5"; // 600
const color2 = "e1f5fe"; // 050
const color3 = "01579b"; // 900
const steps = 1000;

const percentages = Utils.percentages(steps);
const percentiles = Utils.distinct(Utils.percentiles(data, percentages));
const colors = Utils.gradient(color1, color2, percentiles.length);

// Rendering
const canvas = Utils.canvas(width, height);
const context = canvas.getContext("2d");

for (let cy = 0; cy < height; cy++) {
    for (let cx = 0; cx < width; cx++) {
        const index = cy * width + cx;
        const item = data[index];

        if (item === -1) {
            context.fillStyle = `#${color3}`;
        } else {
            const next = percentiles.findIndex((p) => item < p);
            const step = next - 1;

            const color = Math.min(Math.max(step, 0), colors.length - 1);

            context.fillStyle = `#${colors[color]}`;
        }

        context.fillRect(cx, cy, 1, 1);
    }
}

// View
// Utils.image(canvas);
