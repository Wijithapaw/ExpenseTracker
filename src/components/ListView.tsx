import React from 'react';
import {SafeAreaView, FlatList, View} from 'react-native';
import IconButton from './IconButton';
import styled from 'styled-components/native';
import Text from './Text';
import {COLORS} from '../types/colors';
import {utils} from '../utils/utils';

const ListRow = styled.View<any>`
  flex: 1;
  flex-direction: row;
  padding: 4px;
  align-items: center;
`;

const ListCol = styled.View<any>`
  flex: 1;
  justify-content: center;
  align-items: ${(props: any) => getTextAlign(props.textAlign)};
`;

const ListActions = styled.View<any>`
  width: 100px;
  flex-direction: row;
  justify-content: flex-end;
`;

const ListActionCol = styled.View<any>`
  align-items: flex-end;
`;

const ListMainSeparator = styled.View`
  flex: 1;
  height: 1px;
  border-bottom-color: ${(props: any) => props.theme.border.primary};
  border-bottom-width: 1px;
`;

const ListItemSeparator = styled.View`
  flex: 1;
  height: 1px;
  border-bottom-color: ${(props: any) => props.theme.border.secondary};
  border-bottom-width: 1px;
`;

const StyledHeader = styled.View`
  flex: 1;
  height: 30px;
  background-color: ${(props: any) => props.theme.background.secondary};
  justify-content: center;
  padding: 5px 10px;
`;

const NoRecordsView = styled.View`
  padding: 10px;
  align-items: center;
`;

interface ListViewItemProps {
  row: any;
  columns: ListViewColumn[];
  actions?: ListAction[];
}

function ListViewRow({row, columns, actions}: ListViewItemProps) {
  return (
    <ListRow>
      {columns.map((col, index) => (
        <ListCol key={index} textAlign={col.textAlign}>
          <Text>{formatData(row[col.field], col.format)}</Text>
        </ListCol>
      ))}
      {actions && (
        <ListActions>
          {actions.map((action, index) => (
            <ListActionCol key={index}>
              <IconButton
                name={getActionIcon(action.action)}
                onPress={() => action.onPress(row)}
              />
            </ListActionCol>
          ))}
        </ListActions>
      )}
    </ListRow>
  );
}

function ListHeader({title}) {
  return (
    <>
      <StyledHeader>
        <Text color={COLORS.white}>{title}</Text>
      </StyledHeader>
      <ListMainSeparator />
    </>
  );
}

interface Props {
  data?: any[];
  columns: ListViewColumn[];
  actions?: ListAction[];
  listTitle?: string;
}

export default function ListView({data, columns, actions, listTitle}: Props) {
  return (
    <SafeAreaView>
      {listTitle && <ListHeader title={listTitle} />}
      <FlatList
        ItemSeparatorComponent={ListItemSeparator}
        data={data}
        renderItem={({item}) => (
          <ListViewRow row={item} columns={columns} actions={actions} />
        )}
        keyExtractor={item => item.id}
      />
      {(!data || !data.length) && (
        <NoRecordsView>
          <Text italic>No Records</Text>
        </NoRecordsView>
      )}
      <ListMainSeparator />
    </SafeAreaView>
  );
}

export interface ListViewColumn {
  field: string;
  format?: ListDataFormat;
  textAlign?: string;
}

export enum ListDataFormat {
  Text = 0,
  Currency = 1,
  Date = 2,
}

export enum ListActionType {
  Delete = 0,
  Edit = 1,
  View = 2,
}

export interface ListAction {
  action: ListActionType;
  onPress: (item: any) => void;
}

function formatData(data: any, format?: ListDataFormat) {
  switch (format) {
    case ListDataFormat.Currency:
      return `${utils.formatCurrency(data, false, true)}`;
    case ListDataFormat.Date:
      return data.toLocaleDateString();
    default:
      return data.toString();
  }
}

function getTextAlign(align: string) {
  switch (align) {
    case 'center':
      return 'center';
    case 'left':
      return 'flex-start';
    case 'right':
      return 'flex-end';
    default:
      return 'flex-start';
  }
}

function getActionIcon(action: ListActionType) {
  switch (action) {
    case ListActionType.Delete:
      return 'trash';
    case ListActionType.Edit:
      return 'pencil';
    case ListActionType.View:
      return 'search';
    default:
      return 'curcle';
  }
}