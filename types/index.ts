import { ReactNode } from "react";
export type MemberInfo = {
    id: number;
    name: string;
    username: string;
    status: boolean;
    email: string;
    city: string;
    rating: number;
    address?: {
      city: string;
    }
};

export interface StarRatingProps {
  rating: number;
  editable?: boolean;
  onChange?: (rating: number) => void;
};

export interface StarProps {
  rating: number;
  style?: React.CSSProperties;
  onChange?: ( rating: number ) => void
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export type MemberContextType = {
  getMember: () => MemberInfo[];
  editMember: (id: number, updatedMember: Partial<MemberInfo>) => void;
  deleteMember: (id: number) => void;
  searchMembers: (query: string) => void
}

export interface MemberProviderProps {
  children: ReactNode;
}


export interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  style?: React.CSSProperties;
}

export interface EditModalProps {
  editOpen?: boolean
  handleEditClose?: () => void
  setEditOpen?: (helt: boolean) => void
  setEditingMember?: (member: MemberInfo) => void
  editingMember?: MemberInfo
}

export interface SearchBarProps {
  handleSearchChange: (query: string) => void

}