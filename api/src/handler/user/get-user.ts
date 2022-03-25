import ThirdParty from 'supertokens-node/recipe/thirdparty';

export default async (id: string): Promise<{ email: string }> => {
  // TODO: this doesnt work (make proper entity)
  const userInfo = await ThirdParty.getUserById(id);

  return {
    email: userInfo?.email ?? '',
  };
};
