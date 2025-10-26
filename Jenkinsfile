pipeline {
    agent any 
    stages {
        stage('checkout code') {
            steps {
                git branch: 'main', url: 'https://github.com/Faiznhmd/acquistions'
            }
        }
        stage('Build') {
            steps {
                sh 'echo "Building the app"'
            }
        }
        stage('Test') {
            steps {
                sh 'echo "Running the tests"'
            }
        }
        stage('Deploy') {
            steps {
                sh 'echo "Deploying the app"'
            }
        }
    }
    post {
        success {
            echo '✅ Build succeeded!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}


