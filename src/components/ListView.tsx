import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { COLORS } from '../types/colors';
import { StyledProps } from '../types/theme.types';
import { DATE_FORMATS, formatDate } from '../utils/date.utils';
import { utils } from '../utils/utils';
import IconButton from './IconButton';
import Text from './Text';

const Container = styled.View``;

const ListRow = styled.View<any>`
  flex-direction: row;
  padding: 4px;
  align-items: center;
`;

const ListCol = styled.View<any>`
  justify-content: center;
  align-items: ${(props: any) => getTextAlign(props.textAlign)};
  flex: 1;
  padding-right: 5px;
`;

const ListActions = styled.View<any>`
  padding-left: 10px;
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
  height: 30px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 5px 10px;
  background: ${(props: StyledProps) => props.theme.background.secondary};
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

function ListViewRow({ row, columns, actions }: ListViewItemProps) {
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

interface HeaderProps {
  title?: string;
  headerComponent?: any;
}

function ListHeader({ title, headerComponent }: HeaderProps) {
  return (
    <StyledHeader>
      {headerComponent ? (
        headerComponent
      ) : (
        <Text color={COLORS.white}>{title}</Text>
      )}
    </StyledHeader>
  );
}

interface Props extends HeaderProps {
  data?: any[];
  columns: ListViewColumn[];
  actions?: ListAction[];
}

export default function ListView({
  data,
  columns,
  actions,
  title,
  headerComponent,
}: Props) {
  return (
    <Container>
      {title && <ListHeader title={title} headerComponent={headerComponent} />}
      <FlatList
        ItemSeparatorComponent={ListItemSeparator}
        data={data}
        renderItem={({ item }) => (
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
    </Container>
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
  Percentage = 3,
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
      return `${utils.formatCurrency(data, false)}`;
    case ListDataFormat.Date:
      return formatDate(data, DATE_FORMATS.dateUniversal);
    case ListDataFormat.Percentage:
      return `${data}%`;
    default:
      return data?.toString() || '';
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
      return 'circle';
  }
}
