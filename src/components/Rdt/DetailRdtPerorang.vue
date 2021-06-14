<template>
  <div>
    <div class="title"><strong>Abdul Ghani</strong></div> <!-- To do: get data from api -->
    <v-row no-gutters>
      <v-col
        class="bg-success"
        cols="12"
        sm="2"
      >
        <v-card
          class="mx-auto bg-success"
        >
          <v-card-text>
            <div class="subtitle-1 white--text text-center">
              <strong>{{ $t('label.test_results') }}</strong>
            </div>
            <div class="white--text text-center">
              <strong>Negatif</strong> <!-- To do: get data from api -->
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        class="bg-default"
        cols="12"
        sm="2"
      >
        <v-card
          class="mx-auto"
          color="white"
        >
          <v-card-text>
            <div class="subtitle-1 green--text">
              <strong>{{ $t('label.rdt_code') }}</strong>
            </div>
            <div>
              <strong>656758765876567858</strong> <!-- To do: get data from api -->
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        class="bg-default"
        cols="12"
        sm="3"
      >
        <v-card
          class="mx-auto"
          color="white"
        >
          <v-card-text>
            <div class="subtitle-1 green--text">
              <strong>{{ $t('label.faskes_name') }}</strong>
            </div>
            <div>
              <strong>RSUD Kota Depok</strong> <!-- To do: get data from api -->
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        class="bg-default"
        cols="12"
        sm="2"
      >
        <v-card
          class="mx-auto"
          color="white"
        >
          <v-card-text>
            <div class="subtitle-1 green--text">
              <strong>{{ $t('label.goal_category') }}</strong>
            </div>
            <div>
              <strong>Kategori B</strong> <!-- To do: get data from api -->
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        class="bg-default"
        cols="12"
        sm="3"
      >
        <v-card
          class="mx-auto"
          color="white"
        >
          <v-card-text>
            <div class="subtitle-1 green--text">
              <strong>{{ $t('label.check_date') }}</strong>
            </div>
            <div>
              <strong>26 Maret 2020</strong> <!-- To do: get data from api -->
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="mx-auto">
          <v-row>
            <v-col
              cols="12"
              sm="3"
            >
              <v-card
                class="mx-auto"
                color="white"
              >
                <v-card-text>
                  <div class="subtitle-1 green--text">
                    <strong>{{ $t('label.nik') }}</strong>
                  </div>
                  <div>
                    <strong>3037686867868</strong> <!-- To do: get data from api -->
                  </div>
                </v-card-text>
              </v-card>
              <v-card
                class="mx-auto"
                color="white"
              >
                <v-card-text>
                  <div class="subtitle-1 green--text">
                    <strong>{{ $t('label.birth_date') }}</strong>
                  </div>
                  <div>
                    <strong>23 Juni 1975</strong> <!-- To do: get data from api -->
                  </div>
                </v-card-text>
              </v-card>
              <v-card
                class="mx-auto"
                color="white"
              >
                <v-card-text>
                  <div class="subtitle-1 green--text">
                    <strong>{{ $t('label.age') }}</strong>
                  </div>
                  <div>
                    <strong>45 Tahun</strong> <!-- To do: get data from api -->
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              sm="3"
            >
              <v-card
                class="mx-auto"
                color="white"
              >
                <v-card-text>
                  <div class="subtitle-1 green--text">
                    <strong>{{ $t('label.gender') }}</strong>
                  </div>
                  <div>
                    <strong>Laki-Laki</strong> <!-- To do: get data from api -->
                  </div>
                </v-card-text>
              </v-card>
              <v-card
                class="mx-auto"
                color="white"
              >
                <v-card-text>
                  <div class="subtitle-1 green--text">
                    <strong>{{ $t('label.phone_number') }}</strong>
                  </div>
                  <div>
                    <strong>0898765775566</strong> <!-- To do: get data from api -->
                  </div>
                </v-card-text>
              </v-card>
              <v-card
                class="mx-auto"
                color="white"
              >
                <v-card-text>
                  <div class="subtitle-1 green--text">
                    <strong>{{ $t('label.citizen') }}</strong>
                  </div>
                  <div>
                    <strong>Indonesia</strong> <!-- To do: get data from api -->
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-card
                class="mx-auto"
                color="white"
              >
                <v-card-text>
                  <div class="subtitle-1 green--text">
                    <strong>{{ $t('label.address') }}</strong>
                  </div>
                  <div>
                    <strong>Jl. Merdeka II No.18</strong> <!-- To do: get data from api -->
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      class="float-right"
      color="#14a942"
      outlined
    >
      {{ $t('label.back') }}
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'DetailRdtPerorang'
}
</script>

<style>
.bg-success {
  background: linear-gradient(90deg, #219653 0%, #27AE60 100%);
  border-radius: 4px;
  border: 0px !important;
}
.bg-default {
  background: #FFFFFF;
}
</style>
