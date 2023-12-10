// Class5_ERP_Back
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                script {
                    def pullRequestBranch = env.GITHUB_PR_SOURCE_BRANCH
                    checkout([$class: 'GitSCM', branches: [[name: "*/${pullRequestBranch}"]], userRemoteConfigs: [[url: 'https://github.com/program-training/Class5-ERP-back']]])
                }
            }
        }
  
        stage('client build') {
            steps {
                script {
                    dir('src') {
                        sh 'echo "Building..."'
                        sh 'docker build -t class5-erp-back .'
                    }
                }
            }
        }
    }
    post {
        success {
            script {
                echo 'Linting passed. You may now merge.'
                setGitHubPullRequestStatus(
                    state: 'SUCCESS',
                    context: 'Class5_ERP_Back',
                    message: 'Build passed',
                )
            }
        }
        failure {
            script {
                echo 'Pipeline failed. Blocking pull request merge.'
                setGitHubPullRequestStatus(
                    state: 'FAILURE',
                    context: 'Class5_ERP_Back',
                    message: 'Build failed  run npm run build to see errors',
                )
            }
        }
    }
}
