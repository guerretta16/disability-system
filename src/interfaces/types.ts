export interface UserHook {
  userInfo: {
    username: string
    rol: string
    employeeId: string
    employeeName: string
  } | null
  loading: boolean
  error: string
  login: (username: string, password: string) => void
  logout: () => void
}

export interface LoginValues {
  username: string
  password: string
}

export interface Application {
  applicationId: string
  coverageDays: number
  doctorName: string
  employee: {
    employeeId: string
    fullName: string
    position: string
    startDate: string
    sysId: string
  }
  employeeId: {
    sys: {
      id: string
      linkType: string
      type: string
    }
  }
  endDate: string
  medicalDiagnostic: string
  medicalUnit: string
  name: string
  startDate: string
  sysId: string
}

export interface TableProps {
  data?: Application[]
  rowsPerPage?: number
  page?: number
}

export interface ApplicationTableProps {
  data?: Application[]
  rowsPerPage?: number
  page?: number
  mutateOnDelete?: any
  mutateOnCreate?: any
}

export interface InputValues {
  filterBy: string
  start: string
  end: string
}

export interface PagesProps {
  data: Application[]
  isLoading: boolean
  mutateOnDelete?: any
  mutateOnCreate?: any
}

export interface ApplicationValues{
  name: string
  medicalUnit: string
  startDate: string
  endDate: string
  doctorName: string
  medicalDiagnostic: string
  employeeId: string
  coverageDays: string
  applicationId?: string
}