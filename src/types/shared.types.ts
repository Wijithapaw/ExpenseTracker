export interface ListItemData {
  id: string;
  title: string;
  data?: ListItemData[];
  expanded?: boolean;
  faIcon?: string;
  parentId?: string;
  parentTitle?: string;
}

export interface FlatListItemData {
  id: string;
  title: string;
  parentId?: string;
  parentTitle?: string;
  show?: boolean;
  expanded?: boolean;
  hasChildren?: boolean;
  level: number;
  faIcon?: string;
}

export interface SimpleListItem {
  id: string;
  title: string;
  parentTitle?: string;
}

export interface KeyValuePair {
  key: string;
  value: string;
}

export interface ConfigItem {
  id: string;
  description: string;
  value: string;
}
