pipeline{
  agent any 
  stages{
    stage('checkout code'){
      steps{
        git 'https://github.com/Faiznhmd/acquistions'
      }
    }
      stage('Build') {
            steps {
               sh 'echo "Building the app"'
            }
        }
    stage('Test') {
             steps {
               sh 'echo Running the test"'
            }
        }
       stage('Deploy') {
             steps {
               sh 'echo "Deploying the App"'
            }
        }
  }
}
