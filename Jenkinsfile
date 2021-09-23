def secretsProd = [
  [path: 'kv-logistik-frontend/production/app-v2', engineVersion: 2, secretValues: [
    [envVar: 'VUE_APP_SECURE', vaultKey: 'VUE_APP_SECURE'],
    [envVar: 'VUE_APP_URL', vaultKey: 'VUE_APP_URL'],
    [envVar: 'VUE_APP_PORT', vaultKey: 'VUE_APP_PORT'],
    [envVar: 'REGISTRY_USERNAME', vaultKey: 'REGISTRY_USERNAME'],
    [envVar: 'REGISTRY_PASSWORD', vaultKey: 'REGISTRY_PASSWORD'],
    [envVar: 'SECRET_POLICY', vaultKey: 'SECRET_POLICY']]],
]

def configuration = [vaultUrl: "${VAULT_JABAR_CLOUD}",  vaultCredentialId: 'approle-logistik', engineVersion: 2]

pipeline {

    agent any

    environment {
        appName = 'frontend-logistik-production'
        PROJECT_REGISTRY ='logistik-pikobar'
        VERSION = "${env.BUILD_ID}"
        URL_REGISTRY = "${URL_REGISTRY_JACLOUD}"
        VAULT_JABAR_CLOUD = "${VAULT_JABAR_CLOUD}"

        CLUSTER_NAME_GKE = "prod-jds-cluster-k8s"  
        PROJECT_ID_GKE = "${PROJECT_ID_GKE}"
    }

    options {
        timeout(time: 1, unit: 'HOURS')
    }

     triggers {
                githubPush()
     }

    stages{

        stage('stage build logistik frontend'){

            steps {

                withVault([configuration: configuration, vaultSecrets: secretsProd]) { 
                        sh 'docker --version'
                        sh 'echo ${VERSION}'
                        sh 'echo $VERSION > version.txt'
                        sh 'DOCKER_BUILDKIT=1 docker build --build-arg VUE_APP_SECURE=$VUE_APP_SECURE --build-arg VUE_APP_URL=$VUE_APP_URL --tag $appName:$VERSION -f Dockerfile . --no-cache'

                    }
                stash includes: 'version.txt', name: 'version'
            }

            post {
                always {
                    archiveArtifacts artifacts: 'version.txt', fingerprint: true
                    cleanWs()
                }
            }
        }

        stage('push to registry logistik'){

            steps {
                script {
                    withDockerRegistry([credentialsId: '1d7c4e03-7bbb-44d4-8202-0612c5b2bc45', url: "https://${URL_REGISTRY}"]) {
                    // code block
                    unstash 'version'
                    sh 'cat version.txt'
                    sh 'export REGISTRY_HTTP_RELATIVEURLS=true \
                        && docker tag $appName:$VERSION $URL_REGISTRY/$PROJECT_REGISTRY/$appName:$VERSION \
                        && docker push $URL_REGISTRY/$PROJECT_REGISTRY/$appName:$VERSION \
                        && docker rmi $appName:$VERSION \
                        && docker rmi $URL_REGISTRY/$PROJECT_REGISTRY/$appName:$VERSION'
                        }
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'version.txt', fingerprint: true
                    cleanWs()
                }
            }
        }

         stage ('deploy to kubernetes gke'){
            agent {
                docker { 
                    image 'kiwigrid/gcloud-kubectl-helm:3.3.4-312.0.0-267'
                    args '-u root'
                }
            }

            steps {
                    // deploy kubernetes cluster production
                    withVault([configuration: configuration, vaultSecrets: secretsProd]) {   
            
                        sh 'sed -i "s/__VERSION__/${VERSION}/g" kubernetes/helm-logistik-frontend/values.yaml'
                        sh '''
                            set +x
                            echo $SERVICE_ACCOUNT_GKE | base64 -d > gcp-key-file.json
                            gcloud auth activate-service-account --key-file=gcp-key-file.json
                            gcloud container clusters get-credentials $CLUSTER_NAME_GKE --project=$PROJECT_ID_GKE --region=asia-southeast2-a
                            set -x
                            kubectl version
                            helm version
                            helm install $appName kubernetes/helm-logistik-frontend --namespace pikobar-logistik --values kubernetes/helm-logistik-frontend/values.yaml --dry-run --debug
                            helm upgrade $appName \
                                --set secret.policy=$SECRET_POLICY \
                                --set secret.registry.username=$REGISTRY_USERNAME \
                                --set secret.registry.password=$REGISTRY_PASSWORD kubernetes/helm-logistik-frontend --namespace pikobar-logistik
                            kubectl get pods --namespace pikobar-logistik
                        '''
                    }
              }

              post {
                  always{
                    cleanWs()
                  }
              }
        }



        
    } 

}
