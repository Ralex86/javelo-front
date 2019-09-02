import React from "react";

type Point = {
  x: number,
  y: number,
  style?: any
};

type Props = {
  width: number,
  height: number,
  points: Array<Point>
};

class Chart extends React.Component<Props> {
  width: number = this.props.width;
  height: number = this.props.height;
  OFFSET: number = 20;

  getNormalizedPointsInOrder = (points: Array<Point>): Array<Point> => {
    return points
      .map((point: Point): Point => this.normalizePoint(point))
      .sort((a, b) => a.x - b.x);
  };

  renderPoints = (points: Array<Point>) => {
    return points.map((point, index) => {
      const { x, y } = this.normalizePoint(point);
      return (
        <circle
          key={index}
          cx={x}
          cy={y}
          r="4"
          strokeWidth="2"
          {...point.style}
        />
      );
    });
  };

  interpolate = (x, x0, x1, y0, y1): number =>
    y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);

  normalizePoint = (point: Point): Point => {
    const xMax = Math.max(...this.props.points.map(point => point.x));
    const xMin = Math.min(...this.props.points.map(point => point.x));

    const yMax = Math.max(...this.props.points.map(point => point.y));
    const yMin = Math.min(...this.props.points.map(point => point.y));
    return {
      x: this.interpolate(
        point.x,
        xMin,
        xMax,
        this.OFFSET,
        this.width - this.OFFSET
      ),
      y:
        this.height -
        this.interpolate(
          point.y,
          yMin,
          yMax,
          this.OFFSET,
          this.height - this.OFFSET
        )
    };
  };

  renderCurve = (points: Array<Point>) => {
    const normalizedPoints = this.getNormalizedPointsInOrder(points).map(
      (point: Point) => `${point.x},${point.y} `
    );

    return (
      <polyline
        fill="none"
        stroke="#ccc"
        points={"".concat(...normalizedPoints)}
      />
    );
  };

  render() {
    const { width, height, points } = this.props;
    return (
      <svg
        width={`${width}px`}
        height={`${height}px`}
        style={{
          borderLeft: "1px dashed #ccc",
          borderBottom: "1px dashed #ccc"
        }}
      >
        {this.renderCurve(points)}
        {this.renderPoints(points)}
      </svg>
    );
  }
}
export default Chart;
