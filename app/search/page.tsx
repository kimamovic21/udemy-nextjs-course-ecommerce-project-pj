type SearchPageProps = {
  searchParams: Promise<{ query?: string }>;
};

const SearchPage = async ({
  searchParams
}: SearchPageProps
) => {
  const params = await searchParams;

  return (
    <div className='container mx-auto py-4'>
      <h1 className='text-2xl font-bold'>Search</h1>
      <p className='text-muted-foreground'>
        The query is {params.query ?? 'not provided'}.
      </p>
    </div>
  );
};

export default SearchPage;