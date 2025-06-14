// types/route-props.ts

export interface PageParams {
  params: {
    slug: string;
  };
}

export interface PageProps extends PageParams {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}
