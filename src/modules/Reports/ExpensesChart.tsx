import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface Props {
  labels: string[];
  values: number[];
}

export default function ExpensesChart({ labels, values }: Props) {
  return (
    <LineChart
      data={{
        labels: labels,
        // eslint-disable-next-line spellcheck/spell-checker
        datasets: [
          {
            data: values,
          },
        ],
      }}
      width={Dimensions.get('window').width - 20} // from react-native
      height={200}
      yAxisLabel=''
      yAxisSuffix=''
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      }}
      style={{
        marginVertical: 0,
        borderRadius: 5,
      }}
    />
  );
}
