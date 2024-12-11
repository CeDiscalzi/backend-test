pipeline {
    agent any
    environment {
        USERNAME = "cdiscalzi"
    }
    stages {
        stage("Build - instalacion de dependencias") {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            stages{
                stage("instalacion dependencias"){
                    steps{
                        sh 'npm install'
                    }
                }
                stage("ejecucion de test"){
                    steps{
                        sh 'npm run test'
                    }
                }
                stage("build del proyecto"){
                    steps{
                        sh 'npm run build'
                    }
                }
            }    
        }

        stage("QA"){
            agent {
                docker {
                    label 'containers'
                    image "sonarsource/sonar-scanner-cli:latest"
                    reuseNode true
                }
            }
            stages(){
                stage("QA - sonarqube"){
                    steps {
                        withSonarQubeEnv('sonarqube'){
                            sh 'sonar-scanner'
                        }
                    }
                }
            }
        }

        stage("delivery - subida a nexus"){
            steps {
                script {
                    docker.withRegistry("http://localhost:8082","registry"){
                        sh 'docker build -t backend-devops .'
                        sh 'docker tag backend-devops:latest localhost:8082/backend-devops:latest'
                        sh 'docker push localhost:8082/backend-devops:latest'
                    }
                }
            }
        }
    }
}
