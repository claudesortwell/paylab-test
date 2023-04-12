import api from ".";

type TPagination = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageIndex: number;
  totalCount: number;
  totalPages: number;
};

export type TgetRetailersReturn = {
  items: TRetailer[];
} & TPagination;

type TRetailer = {
  id: number;
  logoUri?: string;
  svgLogoUri?: string;
  name: string;
  rewardPercent: number;
  rewardThreshold: number;
};

export const getRetailers = async (params: { pageSize: number }) => {
  const result = await api.get(
    `/retailer/details?page_size=${params.pageSize}`
  );

  return result.data.data as TgetRetailersReturn;
};
