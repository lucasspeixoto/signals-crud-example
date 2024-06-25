# Repositório base do artigo: [Criando um CRUD com Angular: Observables + Signals](https://medium.com/@lspeixotodev/criando-um-crud-com-angular-observables-signals-75008ff4671c)

## Introdução

Signals é uma nova feature disponível no Angular a partir da versão 16 lançado em maio de 2023. Na comunidade muitas discussões a respeito desta nova feature estão acontecendo, mas afinal, o que é um Signal ? Um signal é um tipo especial de variável, que além de possuir um valor, emite uma notificação, ou seja, notifica quando este valor é alterado (reativo). Em resumo, podemos dizer que um signal:

* É uma variável + notificação de mudanças;
* É reativo;
* É síncrono;
* Sempre possui um valor;

Em aplicações Angular pode ser utilizado em conjunto com observables do RxJS e não como substituto.

## Contextualização

Se olharmos as dependências de um projeto angular, vamos ver que existe uma ferramenta chamada Zone.js, que auxilia o framework no processo de detecção de mudanças, ou seja, na identificação de alterações para informar que era precisa uma atualização nos templates de forma e refletir os novos valores.

Por mais que funcionasse muito bem, Zone.js não possibilita a identificação específica de onde a mudança acontece, precisando desta forma, atualizar toda a árvore de componentes da aplicação. Com o Signals, será possível uma maior granularidade nestas detecções de mudanças, ou seja, aumentar a eficiência no processo.

Neste artigo vamos entender na prática os conceitos por trás dos signals através de um crud completo. Além de entender os conceitos vamos verificar situações especificas para melhor utilizar cada funcionalidade nova por trás dos signals.

Com os signals conseguimos uma forma mais simples e eficiente de gerenciar estado em aplicações angular, neste exemplo prático vamos aprender diversas funcionalidades que nos auxiliam no gerenciamento de estado utilizando signals como, por exemplo: signals, computed, mutate, set, toSignal, toObservable e effect.