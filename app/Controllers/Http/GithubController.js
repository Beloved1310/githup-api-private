const { Octokit } = require('@octokit/rest');

const Env = use('Env');

const auth = new Octokit({
  appId: Number(Env.get('GITHUB_APP_ID')),
  privateKey: Env.get('GITHUB_APP_PRIVATE_KEY'),
  installationId: Number(Env.get('GITHUB_APP_INSTALLATION_ID')),
});

class GithubController {
  async getPrivateRepositories({ response }) {
    try {
      const repos = await  auth.repos.listPublic({visibility: 'private'})
      // const repos = await auth.repos.listForAuthenticatedUser({ visibility: 'private' });
      return response.json(repos.data);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

module.exports = GithubController;


