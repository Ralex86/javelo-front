// @flow
import * as React from "react";

type Props = {
  data: Array<any>,
  renderItem: Function
};

const List = (
  props: Props
): Array<React.Element<*>> | React.Element<*> | null => {
  const { data, renderItem } = props;

  if (data == null) return null;

  const _renderItem = (item, index): React.Element<*> => {
    return <React.Fragment key={index}>{renderItem(item)}</React.Fragment>;
  };

  return data.map((item: any, index: number): React.Element<*> =>
    _renderItem(item, index)
  );
};

export default List;
