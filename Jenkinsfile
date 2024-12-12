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
                    args '--network=devops-infra_default'
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
                stage("QA - quality gate"){
                    steps {
                        script{
                            timeout(time: 1, unit: 'MINUTES'){
                                def qgate = waitForQualityGate()
                                if (qgate.status != 'OK') {
                                    error "Pipeline aborted - Quality Gate failure: ${qgate.status} "
                                }
                            }
                        }
                    }
                }
            }
        }

        stage("delivery - subida a nexus"){
            steps {
                script {
                    docker.withRegistry("http://localhost:8082","registry"){
                        sh 'docker build -t backend-test .'
                        sh 'docker tag backend-test:latest localhost:8082/backend-test:latest'
                        sh 'docker push localhost:8082/backend-test:latest'
                    }
                }
            }
        }
    }
}
